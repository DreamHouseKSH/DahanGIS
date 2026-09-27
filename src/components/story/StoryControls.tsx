'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { createGuidedScroll, INITIAL_SCROLL_STATE, type GuidedScrollController } from '../../lib/guided-scroll';
import { chapters, pillars, type Chapter } from './content';
import '../../styles/story-polish.css';
import '../../styles/story-controls.css';

const serviceLabels: Record<typeof pillars[number]['id'], string> = {
  ortho: '정사영상', data: '데이터 구축', consult: '컨설팅', software: '소프트웨어', edu: '교육',
};

/** One scroll position drives the chapter rail, submenus and guided playback. */
export default function StoryControls() {
  const [active, setActive] = useState<Chapter>('start');
  const [subsection, setSubsection] = useState('');
  const [playback, setPlayback] = useState(INITIAL_SCROLL_STATE);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const railRef = useRef<HTMLElement>(null);
  const quickRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const pointRef = useRef<SVGCircleElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const controllerRef = useRef<GuidedScrollController | null>(null);
  const refreshRef = useRef<() => void>(() => {});
  const activeRef = useRef<Chapter>('start');
  const subsectionRef = useRef('');
  const servicesOpen = active === 'services';
  const { speed, idleEnabled, phase, notice } = playback;
  const pause = () => controllerRef.current?.pause();
  const followLink = () => { pause(); setMenuOpen(false); };

  useEffect(() => {
    const controller = createGuidedScroll(setPlayback);
    controllerRef.current = controller;
    return () => { controller.destroy(); controllerRef.current = null; };
  }, []);
  useEffect(() => { controllerRef.current?.setMenuOpen(menuOpen); }, [menuOpen]);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); menuRef.current?.focus(); }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.story-root');
    if (!root) return;
    const rail = railRef.current;
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
          if (rect && rect.top <= height * 0.38) sub = pillar.id;
        }
      }
      if (sub !== subsectionRef.current) { subsectionRef.current = sub; setSubsection(sub); }
      const total = Math.max(1, document.documentElement.scrollHeight - height);
      progressRef.current?.style.setProperty('transform', `scaleX(${Math.max(0, Math.min(1, window.scrollY / total))})`);
      const hero = document.getElementById('start');
      const heroProgress = Math.max(0, Math.min(1, window.scrollY / Math.max(1, (hero?.offsetHeight || height) * 0.85)));
      root.style.setProperty('--alignment', motion.matches ? '1' : String(heroProgress));
      for (const node of root.querySelectorAll<HTMLElement>('[data-story-step]')) node.dataset.current = String(node.getBoundingClientRect().top < height * 0.74);
      // In services, connect the active nested item to its own heading, not the overview.
      const target = sub || current;
      const marker = rail?.querySelector<HTMLElement>(`a[href="#${target}"] > span:last-child`);
      const destination = document.querySelector<HTMLElement>(`#${target} [data-story-target], #${target} h2`);
      if (marker && destination && lineRef.current && pointRef.current) {
        const from = marker.getBoundingClientRect(), to = destination.getBoundingClientRect();
        const x1 = from.right + 14, y1 = from.top + from.height / 2;
        const x2 = Math.max(x1 + 42, to.left - 18), y2 = Math.max(150, Math.min(height - 100, to.top + Math.min(to.height / 2, 44)));
        lineRef.current.setAttribute('d', `M ${x1} ${y1} H ${x1 + 18} L ${x2 - 16} ${y2} H ${x2}`);
        pointRef.current.setAttribute('cx', String(x2)); pointRef.current.setAttribute('cy', String(y2));
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    refreshRef.current = schedule;
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule);
    observer?.observe(root);
    if (rail) observer?.observe(rail);
    rail?.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    motion.addEventListener('change', schedule);
    update();
    return () => {
      refreshRef.current = () => {};
      cancelAnimationFrame(frame); observer?.disconnect(); rail?.removeEventListener('scroll', schedule);
      window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); motion.removeEventListener('change', schedule);
    };
  }, []);

  useEffect(() => {
    // Scroll only the menu's own overflow region, never the document being read.
    const target = subsection || active;
    for (const menu of [railRef.current, quickRef.current]) {
      const link = menu?.querySelector<HTMLElement>(`a[href="#${target}"]`);
      if (!menu || !link || !menu.getClientRects().length) continue;
      const box = menu.getBoundingClientRect(), item = link.getBoundingClientRect();
      if (menu === railRef.current) {
        if (item.top < box.top) menu.scrollTop -= box.top - item.top + 8;
        else if (item.bottom > box.bottom) menu.scrollTop += item.bottom - box.bottom + 8;
      } else {
        if (item.left < box.left) menu.scrollLeft -= box.left - item.left + 8;
        else if (item.right > box.right) menu.scrollLeft += item.right - box.right + 8;
      }
    }
    refreshRef.current();
  }, [active, subsection]);

  const serviceLinks = () => pillars.map((pillar, index) => <li key={pillar.id}>
    <a href={`#${pillar.id}`} aria-label={pillar.title} aria-current={subsection === pillar.id ? 'location' : undefined} onClick={followLink}>
      <span className="story-service-number">{String(index + 1).padStart(2, '0')}</span><span>{serviceLabels[pillar.id]}</span>
    </a>
  </li>);
  const chapterLinks = (prefix: string) => chapters.map((chapter, index) => <div key={chapter.id} className="story-chapter">
    <a href={`#${chapter.id}`} aria-current={active === chapter.id ? 'location' : undefined}
      aria-expanded={chapter.id === 'services' ? servicesOpen : undefined}
      aria-controls={chapter.id === 'services' ? `${prefix}-services` : undefined} onClick={followLink}>
      <span className="story-rail-dot" /><span className="story-chapter-number">{String(index + 1).padStart(2, '0')}</span><span>{chapter.label}</span>
    </a>
    {chapter.id === 'services' ? <ul id={`${prefix}-services`} className="story-service-menu" aria-label="서비스 세부 항목" hidden={!servicesOpen}>{serviceLinks()}</ul> : null}
  </div>);
  const hint = speed ? '재생 중' : phase === 'waiting' ? '30초 대기' : phase === 'off' ? '수동' : '일시정지';
  return <>
    <header className="story-header">
      <Link href="/" className="story-brand" aria-label="DahanGIS 홈으로 이동"><Image src="/images/DAHAN_logo_v01.png" alt="다한지리정보" width={164} height={44} unoptimized /></Link>
      <nav className="story-top-nav" aria-label="원페이지 주요 메뉴">{chapters.slice(1).map((chapter) => <a key={chapter.id} href={`#${chapter.id}`} aria-current={active === chapter.id ? 'location' : undefined} onClick={followLink}>{chapter.label}</a>)}</nav>
      <button type="button" className="story-theme" onClick={toggleTheme} aria-label={`${theme === 'dark' ? '라이트' : '다크'} 모드로 전환`}><i className={`bi bi-${theme === 'dark' ? 'sun' : 'moon'}`} aria-hidden="true" /></button>
      <div className="story-auto" data-auto-controls data-state={phase} data-idle-enabled={idleEnabled} role="group" aria-label="자동 스크롤 속도">
        <button type="button" className="story-auto-label" aria-label="AUTO 자동 스크롤 시작" aria-describedby="story-auto-help" title="지금 0.5배속으로 시작 · 직접 조작 후 30초 대기" onClick={() => controllerRef.current?.selectSpeed(0.5)}><span>AUTO</span><small>{hint}</small></button>
        {([0, 0.5, 1, 2] as const).map((value) => <button key={value} type="button" aria-label={value ? `자동 스크롤 ${value}배속` : '자동 스크롤 끄기'} title={value ? `${value}배속으로 시작` : '정지하고 30초 자동 시작도 끄기'} aria-pressed={speed === value} onClick={() => controllerRef.current?.selectSpeed(value)}>{value ? `${value}x` : 'Off'}</button>)}
      </div>
      <button ref={menuRef} type="button" className="story-mobile-toggle" aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={menuOpen} aria-controls="story-mobile-menu" onClick={() => setMenuOpen((value) => !value)}><i className={`bi bi-${menuOpen ? 'x-lg' : 'list'}`} aria-hidden="true" /></button>
      <div className="story-total-progress" aria-hidden="true"><span ref={progressRef} /></div>
    </header>
    <nav ref={railRef} className="story-rail" aria-label="스크롤 구간 목차">{chapterLinks('story-rail')}<small>{servicesOpen ? pillars.find((pillar) => pillar.id === subsection)?.title || '다섯 가지 역량' : chapters.find((chapter) => chapter.id === active)?.english}</small></nav>
    <nav id="story-mobile-menu" className="story-mobile-menu" aria-label="모바일 구간 목차" hidden={!menuOpen}>{chapterLinks('story-mobile')}</nav>
    <nav ref={quickRef} className="story-mobile-services" aria-label="서비스 빠른 이동" hidden={!servicesOpen || menuOpen}><ul>{serviceLinks()}</ul></nav>
    <div className="story-mobile-chapter" data-services={servicesOpen} aria-hidden="true">{String(chapters.findIndex((chapter) => chapter.id === active) + 1).padStart(2, '0')} / 06 <span>{chapters.find((chapter) => chapter.id === active)?.label}</span></div>
    <svg className="story-connector" aria-hidden="true"><path ref={lineRef} /><circle ref={pointRef} r="3" /></svg>
    <p id="story-auto-help" className="dg-sr-only">AUTO를 누르면 지금 0.5배속으로 시작합니다. 30초간 조작이 없어도 자동으로 시작합니다. Off를 누르면 자동 시작도 꺼집니다. 입력 중이거나 문의 구간에서는 자동으로 움직이지 않습니다.</p>
    <p className="story-auto-status dg-sr-only" role="status">{notice}</p>
  </>;
}
