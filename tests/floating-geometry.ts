import { expect, type Page } from '@playwright/test';

export type Theme = 'light' | 'dark';
export const THEMES: Theme[] = ['light', 'dark'];
/** 칩 띠·알약이 나오는 폭(980px 이하) — 완료 정의의 폭 목록 그대로. */
export const MOBILE_WIDTHS = [360, 390, 430, 640, 768, 980];

/** 한 스크롤 표본에서 잰 모바일 떠 있는 요소 둘. 좌표는 뷰포트 기준 CSS px. */
export type FloatingSample = {
  scrollY: number;
  /** 칩 띠(.story-mobile-services): 배경 알파·누적 opacity, 띠 사각형 안 격자 점 수와 그중 본문이 맨 위에 드러난 점 수. */
  strip: { shown: boolean; alpha: number; opacity: number; points: number; exposed: number; exposedBy: string };
  /** 알약(.story-mobile-chapter): 글자, 가려지지 않은 본문 글자와 겹친 넓이(px²)와 그 글자. */
  pill: { shown: boolean; text: string; overlapPx: number; overlapWith: string };
};

/** 저장된 테마(layout.tsx 의 `dahangis-theme`)를 정해 두고 지정한 폭으로 연다. */
export async function openThemed(page: Page, path: string, theme: Theme, width: number, height = 844) {
  await page.setViewportSize({ width, height });
  await page.addInitScript((value) => { try { window.localStorage.setItem('dahangis-theme', value); } catch { /* 저장소가 없어도 기본 테마로 계속한다. */ } }, theme);
  await page.goto(path, { waitUntil: 'networkidle' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
}

/**
 * scrollY 로 옮긴 뒤 칩 띠와 알약을 잰다.
 * - 띠: 사각형 안쪽 1px 부터 6px 격자(네 모서리·좌우 끝 포함)의 각 점에서 맨 위 요소가 띠 쪽(띠·띠의 자손·헤더·
 *   띠를 품은 불투명 fixed/sticky 조상)이 아니면 "본문이 드러난 점"으로 센다. 의사요소는 주인 요소로 잡힌다.
 * - 알약: 헤더 밖 p·h1~h3·a·span 안 글자 노드의 줄 상자(Range)와 알약 사각형의 교집합을 2px 격자로 훑어,
 *   그 점에서 알약을 걷어 냈을 때 글자가 헤더나 불투명 fixed/sticky 층에 가려지지 않으면 겹친 넓이로 센다.
 * 한계: pointer-events:none 인 층은 elementsFromPoint 에 잡히지 않는다.
 */
export async function measureFloating(page: Page, scrollY: number): Promise<FloatingSample> {
  return page.evaluate(async (top) => {
    window.scrollTo({ top, behavior: 'instant' });
    await new Promise<void>((done) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(done, 40))));
    const CHROME = '.story-header,.story-rail,.story-connector,.story-mobile-menu,.story-mobile-services,.story-mobile-chapter,.dg-sr-only';
    const alphaOf = (color: string) => {
      if (color === 'transparent') return 0;
      const alpha = color.startsWith('rgba(') ? color.split(',').pop() : color.includes('/') ? color.split('/').pop() : '1';
      return Number.parseFloat(alpha ?? '1');
    };
    const opacityOf = (node: Element) => {
      let value = 1;
      for (let el: Element | null = node; el; el = el.parentElement) value *= Number(getComputedStyle(el).opacity);
      return value;
    };
    const shown = (el: Element) => {
      const box = el.getBoundingClientRect();
      return box.width > 0 && box.height > 0 && getComputedStyle(el).visibility !== 'hidden' && opacityOf(el) > 0.01;
    };
    const opaqueLayer = (el: Element) => {
      const style = getComputedStyle(el);
      return /fixed|sticky/.test(style.position) && alphaOf(style.backgroundColor) === 1 && opacityOf(el) === 1;
    };
    const steps = (from: number, to: number, step: number) => {
      const values: number[] = [];
      for (let value = from; value < to; value += step) values.push(value);
      return [...values, to];
    };
    const name = (el: Element | null) => (el ? `${el.tagName.toLowerCase()}.${String(el.getAttribute('class') ?? '').split(' ')[0]}` : 'none');
    const header = document.querySelector('.story-header')!;
    const strip = document.querySelector<HTMLElement>('.story-mobile-services')!;
    const pill = document.querySelector<HTMLElement>('.story-mobile-chapter')!;

    const stripBox = strip.getBoundingClientRect();
    const stripResult = { shown: shown(strip), alpha: alphaOf(getComputedStyle(strip).backgroundColor), opacity: opacityOf(strip), points: 0, exposed: 0, exposedBy: '' };
    if (stripResult.shown) {
      const xs = steps(Math.max(stripBox.left, 0) + 1, Math.min(stripBox.right, innerWidth) - 1, 6);
      for (const x of xs) for (const y of steps(stripBox.top + 1, stripBox.bottom - 1, 6)) {
        const front = document.elementFromPoint(x, y);
        stripResult.points += 1;
        if (front && (strip.contains(front) || header.contains(front) || (front.contains(strip) && opaqueLayer(front)))) continue;
        stripResult.exposed += 1;
        stripResult.exposedBy ||= `${name(front)}@${Math.round(x)},${Math.round(y)}`;
      }
    }

    const pillBox = pill.getBoundingClientRect();
    const pillResult = { shown: shown(pill), text: (pill.textContent ?? '').replace(/\s+/g, ' ').trim(), overlapPx: 0, overlapWith: '' };
    const readable = (x: number, y: number, owner: Element) => {
      for (const layer of document.elementsFromPoint(x, y)) {
        if (pill.contains(layer)) continue;
        if (layer === owner || owner.contains(layer) || layer.contains(owner)) return true;
        if (header.contains(layer) || opaqueLayer(layer)) return false;
      }
      return false;
    };
    if (pillResult.shown) {
      const range = document.createRange();
      for (const el of document.querySelectorAll<HTMLElement>('p,h1,h2,h3,a,span')) {
        const box = el.getBoundingClientRect();
        if (box.bottom < pillBox.top - 40 || box.top > pillBox.bottom + 40 || el.closest(CHROME) || !shown(el)) continue;
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          if (!node.textContent?.trim()) continue;
          range.selectNodeContents(node);
          for (const line of range.getClientRects()) {
            const left = Math.max(line.left, pillBox.left), right = Math.min(line.right, pillBox.right);
            const upper = Math.max(line.top, pillBox.top), lower = Math.min(line.bottom, pillBox.bottom);
            if (right <= left || lower <= upper) continue;
            let hits = 0, cells = 0;
            for (let x = left + 0.5; x < right; x += 2) for (let y = upper + 0.5; y < lower; y += 2) { cells += 1; if (readable(x, y, node.parentElement ?? el)) hits += 1; }
            const area = Math.round(((right - left) * (lower - upper) * hits) / Math.max(cells, 1));
            if (area > pillResult.overlapPx) { pillResult.overlapPx = area; pillResult.overlapWith = `${name(el)} "${node.textContent.trim().slice(0, 16)}"`; }
          }
        }
      }
    }
    return { scrollY: Math.round(window.scrollY), strip: stripResult, pill: pillResult };
  }, scrollY);
}

/** /services/ 의 한 절에 멈춘 뒤 번호 글자 상자와 그 위 고정 띠 사이를 잰다. */
export type AnchorSample = { id: string; sticky: boolean; edge: number; numberTop: number; gap: number };

export async function measureAnchor(page: Page, id: string): Promise<AnchorSample> {
  return page.evaluate(async (target) => {
    for (let last = -1, still = 0, started = performance.now(); still < 15 && performance.now() - started < 5000;) {
      await new Promise((frame) => requestAnimationFrame(frame));
      still = window.scrollY === last ? still + 1 : 0;
      last = window.scrollY;
    }
    const nav = document.querySelector('nav.dg-service-nav')!;
    const range = document.createRange();
    range.selectNodeContents(document.querySelector(`#${target} span.dg-big-num`)!);
    const numberTop = range.getBoundingClientRect().top;
    // 탭 띠가 sticky 인 폭은 탭 띠 아랫변, 아니면 헤더 아랫변이 기준이다.
    const sticky = getComputedStyle(nav).position === 'sticky';
    const edge = (sticky ? nav : document.querySelector('header.dg-header')!).getBoundingClientRect().bottom;
    const round = (value: number) => Math.round(value * 10) / 10;
    return { id: target, sticky, edge: round(edge), numberTop: round(numberTop), gap: round(numberTop - edge) };
  }, id);
}
