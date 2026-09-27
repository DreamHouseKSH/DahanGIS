'use client';

import { useEffect, useRef } from 'react';

/** Enhancements must never hide content unless that exact node is observed. */
export default function DesignEffects() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(min-width: 981px) and (pointer: fine)');
    const pending = new Set<HTMLElement>();
    const reveal = (element: HTMLElement) => {
      element.classList.add('dg-in');
      element.classList.remove('dg-reveal-pending');
      pending.delete(element);
    };
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal(entry.target as HTMLElement);
          observer?.unobserve(entry.target);
        }
      }),
      { threshold: 0.05 }
    );

    const visit = (node: Node, callback: (element: HTMLElement) => void) => {
      if (!(node instanceof HTMLElement)) return;
      if (node.matches('[data-reveal]')) callback(node);
      node.querySelectorAll<HTMLElement>('[data-reveal]').forEach(callback);
    };
    const register = (element: HTMLElement) => {
      if (!observer || motion.matches || element.classList.contains('dg-in')) return;
      if (pending.has(element)) return;
      try {
        observer.observe(element);
        pending.add(element);
        element.classList.add('dg-reveal-pending');
      } catch {
        reveal(element);
      }
    };
    const unregister = (element: HTMLElement) => {
      observer?.unobserve(element);
      pending.delete(element);
      element.classList.remove('dg-reveal-pending');
    };

    // Shared layouts persist during navigation. Observe newly inserted route nodes too.
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.removedNodes.forEach((node) => visit(node, unregister));
        record.addedNodes.forEach((node) => visit(node, register));
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });
    visit(document.body, register);

    let frame = 0;
    let x = 0;
    let y = 0;
    const hideCursor = () => document.documentElement.classList.remove('dg-cursor-ready');
    const pointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || !finePointer.matches || motion.matches) return;
      x = event.clientX;
      y = event.clientY;
      const target = event.target;
      cursorRef.current?.classList.toggle('dg-hover', target instanceof Element && Boolean(target.closest('a, button, input, textarea, select, summary')));
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const cursor = cursorRef.current;
        const dot = dotRef.current;
        if (!cursor || !dot) return;
        const radius = cursor.classList.contains('dg-hover') ? 22 : 7;
        cursor.style.transform = `translate(${x - radius}px, ${y - radius}px)`;
        dot.style.transform = `translate(${x - 2}px, ${y - 2}px)`;
        document.documentElement.classList.add('dg-cursor-ready');
      });
    };
    const preferencesChanged = () => {
      hideCursor();
      if (motion.matches) {
        pending.forEach((element) => {
          observer?.unobserve(element);
          reveal(element);
        });
      }
    };
    window.addEventListener('pointermove', pointerMove, { passive: true });
    window.addEventListener('blur', hideCursor);
    document.documentElement.addEventListener('pointerleave', hideCursor);
    motion.addEventListener('change', preferencesChanged);
    finePointer.addEventListener('change', preferencesChanged);

    return () => {
      mutations.disconnect();
      observer?.disconnect();
      pending.forEach((element) => element.classList.remove('dg-reveal-pending'));
      pending.clear();
      document.documentElement.classList.remove('dg-reveal-ready', 'dg-cursor-ready');
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', pointerMove);
      window.removeEventListener('blur', hideCursor);
      document.documentElement.removeEventListener('pointerleave', hideCursor);
      motion.removeEventListener('change', preferencesChanged);
      finePointer.removeEventListener('change', preferencesChanged);
    };
  }, []);

  return <><div ref={cursorRef} className="dg-cursor" aria-hidden="true" /><div ref={dotRef} className="dg-cursor-dot" aria-hidden="true" /></>;
}
