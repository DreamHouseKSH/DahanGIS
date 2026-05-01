'use client';

import { useEffect } from 'react';

export default function DesignEffects() {
  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const cursor = document.getElementById('dg-cursor');
    const dot = document.getElementById('dg-cursor-dot');

    document.documentElement.classList.add('dg-reveal-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('dg-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));

    const moveCursor = (event: MouseEvent) => {
      if (!cursor || !dot) return;
      document.documentElement.classList.add('dg-cursor-ready');
      cursor.style.transform = `translate(${event.clientX - 7}px, ${event.clientY - 7}px)`;
      dot.style.transform = `translate(${event.clientX - 2}px, ${event.clientY - 2}px)`;
    };

    const hoverTargets = Array.from(document.querySelectorAll('a, button, input, textarea, select, summary'));
    const addHover = () => cursor?.classList.add('dg-hover');
    const removeHover = () => cursor?.classList.remove('dg-hover');

    window.addEventListener('mousemove', moveCursor);
    hoverTargets.forEach((target) => {
      target.addEventListener('mouseenter', addHover);
      target.addEventListener('mouseleave', removeHover);
    });

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('dg-cursor-ready');
      window.removeEventListener('mousemove', moveCursor);
      hoverTargets.forEach((target) => {
        target.removeEventListener('mouseenter', addHover);
        target.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  return (
    <>
      <div className="dg-cursor" id="dg-cursor" aria-hidden="true" />
      <div className="dg-cursor-dot" id="dg-cursor-dot" aria-hidden="true" />
    </>
  );
}
