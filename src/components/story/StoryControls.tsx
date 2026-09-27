'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { chapters, pillars, type Chapter } from './content';

type Speed = 0 | 0.5 | 1 | 2;
const scrollKeys = new Set(['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' ', 'Escape']);

/** One browser scroll position drives both manual and guided presentation modes. */
export default function StoryControls() {
  const [active, setActive] = useState<Chapter>('start');
  const [subsection, setSubsection] = useState('');
  const [speed, setSpeed] = useState<Speed>(0);
  const [notice, setNotice] = useState('수동 스크롤');
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const railRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const pointRef = useRef<SVGCircleElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const rate = useRef<Speed>(0);
  const activeRef = useRef<Chapter>('start');
  const subsectionRef = useRef('');

  function pause(message = '직접 조작해 자동 스크롤을 멈췄습니다.') {
    if (rate.current === 0) return;
    rate.current = 0; setSpeed(0); setNotice(message);
  }
  function selectSpeed(value: Speed) {
    if (!value) { rate.current = 0; setSpeed(0); setNotice('수동 스크롤'); return; }
    const contact = document.getElementById('contact');
    if (contact && contact.getBoundingClientRect().top <= window.innerHeight * 0.2) {
      setNotice('문의 내용을 편하게 작성하도록 자동 스크롤을 멈췄습니다.');
      return;
    }
    rate.current = value; setSpeed(value); setNotice(`자동 스크롤 · ${value}배속`);
  }

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.story-root');
    if (!root) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = window.innerHeight;
      let current: Chapter = 'start';
      for (const chapter of chapters) {
        const rect = document.getElementById(chapter.id)?.getBoundingClientRect();
        if (rect && rect.top <= height * 0.38) current = chapter.id;
      }
      if (current !== activeRef.current) { activeRef.current = current; setActive(current); }
      let sub = '';
      if (current === 'services') {
        for (const pillar of pillars) {
          const rect = document.getElementById(pillar.id)?.getBoundingClientRect();
          if (rect && rect.top <= height * 0.38) sub = pillar.title;
        }
      }
      if (sub !== subsectionRef.current) { subsectionRef.current = sub; setSubsection(sub); }
      const total = Math.max(1, document.documentElement.scrollHeight - height);
      progressRef.current?.style.setProperty('transform', `scaleX(${Math.max(0, Math.min(1, window.scrollY / total))})`);
      const hero = document.getElementById('start');
      const heroProgress = Math.max(0, Math.min(1, window.scrollY / Math.max(1, (hero?.offsetHeight || height) * 0.85)));
      root.style.setProperty('--alignment', motion.matches ? '1' : String(heroProgress));
      const nodes = root.querySelectorAll<HTMLElement>('[data-story-step]');
      for (const node of nodes) node.dataset.current = String(node.getBoundingClientRect().top < height * 0.74);
      const marker = railRef.current?.querySelector<HTMLElement>(`[href="#${current}"] .story-rail-dot`);
      const destination = document.querySelector<HTMLElement>(`#${current} [data-story-target]`);
      if (marker && destination && lineRef.current && pointRef.current) {
        const from = marker.getBoundingClientRect(), to = destination.getBoundingClientRect();
        const x1 = from.right + 14, y1 = from.top + from.height / 2;
        const x2 = Math.max(x1 + 42, to.left - 18), y2 = Math.max(150, Math.min(height - 100, to.top + Math.min(to.height / 2, 44)));
        lineRef.current.setAttribute('d', `M ${x1} ${y1} H ${x1 + 18} L ${x2 - 16} ${y2} H ${x2}`);
        pointRef.current.setAttribute('cx', String(x2)); pointRef.current.setAttribute('cy', String(y2));
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule);
    observer?.observe(root);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    motion.addEventListener('change', schedule);
    update();
    return () => { cancelAnimationFrame(frame); observer?.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); motion.removeEventListener('change', schedule); };
  }, []);

  useEffect(() => {
    const stop = (message: string) => {
      if (!rate.current) return;
      rate.current = 0; setSpeed(0); setNotice(message);
    };
    const interaction = (event: Event) => {
      if (event.target instanceof Element && event.target.closest('[data-auto-controls]')) return;
      stop('직접 조작해 자동 스크롤을 멈췄습니다.');
    };
    const keyboard = (event: KeyboardEvent) => {
      if (scrollKeys.has(event.key)) stop('직접 조작해 자동 스크롤을 멈췄습니다.');
      if (event.key === 'Escape') { setMenuOpen(false); if (document.activeElement?.closest('.story-mobile-menu')) menuRef.current?.focus(); }
    };
    const focus = (event: FocusEvent) => {
      if (event.target instanceof Element && event.target.closest('form, input, textarea, select, [contenteditable="true"]') && !event.target.closest('[data-auto-controls]')) stop('입력하는 동안 자동 스크롤을 멈췄습니다.');
    };
    const hide = () => stop('화면을 벗어나 자동 스크롤을 멈췄습니다.');
    const visibility = () => { if (document.hidden) hide(); };
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const preference = () => { if (motion.matches) stop('동작 줄이기 설정에 따라 자동 스크롤을 멈췄습니다.'); };
    window.addEventListener('wheel', interaction, { passive: true });
    window.addEventListener('touchstart', interaction, { passive: true });
    window.addEventListener('pointerdown', interaction, { passive: true });
    window.addEventListener('keydown', keyboard);
    window.addEventListener('blur', hide);
    document.addEventListener('focusin', focus);
    document.addEventListener('visibilitychange', visibility);
    motion.addEventListener('change', preference);
    return () => {
      rate.current = 0;
      window.removeEventListener('wheel', interaction); window.removeEventListener('touchstart', interaction); window.removeEventListener('pointerdown', interaction); window.removeEventListener('keydown', keyboard); window.removeEventListener('blur', hide); document.removeEventListener('focusin', focus); document.removeEventListener('visibilitychange', visibility); motion.removeEventListener('change', preference);
    };
  }, []);

  useEffect(() => {
    if (!speed) return;
    let frame = 0, last: number | null = null, position = window.scrollY;
    const tick = (time: number) => {
      if (!rate.current || document.hidden) return;
      const elapsed = last === null ? 0 : Math.min(64, time - last);
      last = time;
      const bottom = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const contact = document.getElementById('contact');
      const boundary = contact ? contact.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.2 : bottom;
      position = Math.min(position + 48 * rate.current * elapsed / 1000, Math.max(0, boundary), bottom);
      window.scrollTo({ top: position, behavior: 'instant' });
      if (position >= Math.min(boundary, bottom) - 1) {
        rate.current = 0; setSpeed(0);
        setNotice(contact ? '문의 내용을 편하게 작성하도록 자동 스크롤을 멈췄습니다.' : '다한의 이야기를 모두 살펴보셨습니다.');
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [speed]);

  const links = chapters.map((chapter, index) => <a key={chapter.id} href={`#${chapter.id}`} aria-current={active === chapter.id ? 'location' : undefined} onClick={() => { pause(); setMenuOpen(false); }}><span className="story-rail-dot" /><span className="story-chapter-number">{String(index + 1).padStart(2, '0')}</span><span>{chapter.label}</span></a>);
  return <>
    <header className="story-header">
      <Link href="/" className="story-brand" aria-label="DahanGIS 홈으로 이동"><Image src="/images/DAHAN_logo_v01.png" alt="다한지리정보" width={164} height={44} unoptimized /></Link>
      <nav className="story-top-nav" aria-label="원페이지 주요 메뉴">{chapters.slice(1).map((chapter) => <a key={chapter.id} href={`#${chapter.id}`} aria-current={active === chapter.id ? 'location' : undefined} onClick={() => pause()}>{chapter.label}</a>)}</nav>
      <button type="button" className="story-theme" onClick={toggleTheme} aria-label={`${theme === 'dark' ? '라이트' : '다크'} 모드로 전환`}><i className={`bi bi-${theme === 'dark' ? 'sun' : 'moon'}`} aria-hidden="true" /></button>
      <div className="story-auto" data-auto-controls role="group" aria-label="자동 스크롤 속도">
        <span className="story-auto-label">AUTO</span>
        {([0, 0.5, 1, 2] as const).map((value) => <button key={value} type="button" aria-label={value ? `자동 스크롤 ${value}배속` : '자동 스크롤 끄기'} aria-pressed={speed === value} onClick={() => selectSpeed(value)}>{value ? `${value}x` : 'Off'}</button>)}
      </div>
      <button ref={menuRef} className="story-mobile-toggle" aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={menuOpen} aria-controls="story-mobile-menu" onClick={() => setMenuOpen((value) => !value)}><i className={`bi bi-${menuOpen ? 'x-lg' : 'list'}`} aria-hidden="true" /></button>
      <div className="story-total-progress" aria-hidden="true"><span ref={progressRef} /></div>
    </header>
    <nav ref={railRef} className="story-rail" aria-label="스크롤 구간 목차">{links}<small>{active === 'services' ? subsection || '다섯 가지 역량' : chapters.find((chapter) => chapter.id === active)?.english}</small></nav>
    <nav id="story-mobile-menu" className="story-mobile-menu" aria-label="모바일 구간 목차" hidden={!menuOpen}>{links}</nav>
    <div className="story-mobile-chapter" aria-hidden="true">{String(chapters.findIndex((chapter) => chapter.id === active) + 1).padStart(2, '0')} / 06 <span>{chapters.find((chapter) => chapter.id === active)?.label}</span></div>
    <svg className="story-connector" aria-hidden="true"><path ref={lineRef} /><circle ref={pointRef} r="3" /></svg>
    <p className="story-auto-status dg-sr-only" role="status">{notice}</p>
  </>;
}
