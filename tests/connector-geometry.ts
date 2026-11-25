import type { Page } from '@playwright/test';

/** 목차 연결선(.story-connector) 한 표본의 측정값. 좌표는 모두 뷰포트 기준 CSS px. */
export type ConnectorSample = {
  width: number; scrollY: number;
  /** 왼쪽 목차에서 지금 활성인 항목 id (서비스 하위 항목이 있으면 그것). */
  item: string;
  lineShown: boolean; dotShown: boolean;
  /** in: 제목 전체가 화면 안쪽 / out: 고정 헤더 아래~화면 바닥 사이에 한 픽셀도 없음 / partial: 그 사이. */
  destination: 'in' | 'partial' | 'out';
  /** 선(1px 간격 표본점)·점이 본문 콘텐츠 상자 하나와 겹친 최대 길이. */
  overlapPx: number; overlapWith: string;
  /** 시작점 x − 활성 라벨 글자 오른쪽 끝, 시작점 y − 라벨 글자 세로 중심. */
  startGap: number; startOffsetY: number;
  /** 눈에 보이는 시작점: 목차의 강조 배경(연결선보다 위에 그려진다)에 가려지지 않은 첫 점의 y − 라벨 글자 세로 중심, 가려진 길이. */
  visibleStartOffsetY: number; hiddenStartPx: number;
  /** marker 요소(span) 사각형의 세로 중심 − 글자 사각형의 세로 중심. */
  markerDeltaY: number;
  endY: number; dotY: number; destTop: number; destBottom: number;
  /** 구간(#item) 상자의 위·아랫변, 고정 헤더 아랫변, 화면 높이. */
  secTop: number; secBottom: number; headerBottom: number; viewHeight: number;
  /** 끝점 x, 그 구간 .story-inner 왼쪽 − 18px(끝점이 있어야 할 x), svg 의 data-visible 유무와 opacity. */
  endX: number; gutterX: number; marked: boolean; opacity: number;
};

/** 구간 상자에서 헤더 아랫변 아래이고 화면 아랫변 위인 부분("보이는 범위")의 높이. 없으면 0 이하. */
export const sectionVisible = (sample: ConnectorSample) => Math.min(sample.secBottom, sample.viewHeight) - Math.max(sample.secTop, sample.headerBottom);

/** 제목이 위로 지나간 뒤 끝점이 머물 "구간의 보이는 범위 위쪽" 띠의 높이(헤더 아랫변부터, px). */
export const TOP_BAND = 120;

/** 완료 정의 1(유지)·2(끝점 위치)를 한 표본에 대어 어긋난 점을 글로 돌려준다. 맞으면 ''. 구간의 보이는 범위가 없는 표본은 보지 않는다. */
export function persistProblem(sample: ConnectorSample): string {
  if (!sample.item || !(sectionVisible(sample) > 0)) return '';
  const at = `${sample.item} · scrollY ${sample.scrollY} (구간 y ${sample.secTop}~${sample.secBottom}, 제목 y ${sample.destTop}~${sample.destBottom}, 헤더 ${sample.headerBottom})`;
  if (!sample.lineShown || !sample.dotShown || !sample.marked || sample.opacity !== 1) return `${at} → 유지 안 됨: 선 ${sample.lineShown} 점 ${sample.dotShown} data-visible ${sample.marked} opacity ${sample.opacity}`;
  const top = Math.max(sample.secTop, sample.headerBottom), bottom = Math.min(sample.secBottom, sample.viewHeight);
  const titleTop = Math.max(sample.destTop, sample.headerBottom), titleBottom = Math.min(sample.destBottom, sample.viewHeight);
  const faults: string[] = [];
  if (Math.abs(sample.endX - sample.gutterX) > 1) faults.push(`끝점 x ${sample.endX} ≠ .story-inner 왼쪽 − 18 = ${sample.gutterX}`);
  for (const [name, y] of [['끝점', sample.endY], ['점', sample.dotY]] as const) {
    if (!(y >= top - 1 && y <= bottom + 1)) faults.push(`${name} y ${y} 가 구간의 보이는 범위 ${top}~${bottom} 밖`);
    if (titleBottom - titleTop > 1 && Math.abs(y - (titleTop + Math.min((titleBottom - titleTop) / 2, 44))) > 1.5) faults.push(`${name} y ${y} 가 제목 기준 위치(보이는 제목 위 + min(절반, 44))와 다름`);
    if (sample.destBottom <= sample.headerBottom && y > sample.headerBottom + TOP_BAND + 1) faults.push(`제목이 지나갔는데 ${name} y ${y} 가 헤더 아래 ${TOP_BAND}px 띠 밖`);
  }
  return faults.length ? `${at} → ${faults.join(' / ')}` : '';
}

/** 제목이 "확실히 화면 안"이라고 볼 위·아래 여유(px). 이 띠 밖의 부분 노출 구간에는 표시 여부를 강제하지 않는다. */
export const IN_VIEW_MARGIN = { top: 150, bottom: 100 };

/**
 * 지금 화면의 연결선을 잰다. 구현 방식(d 형식·끝점 위치)에 묶이지 않도록 선은 getPointAtLength 로 1px 마다 찍어 본다.
 * 본문 콘텐츠 상자 = ① 글자 줄 상자(텍스트 노드의 client rect) ② img·picture·video·canvas ③ 배경 또는 네 변 테두리가 있는 요소.
 * 세지 않는 것: 고정 UI(헤더·목차·모바일 메뉴·연결선 자신), section/main, 목적지 제목의 조상(제목이 놓인 구간 배경),
 * 선의 시작점보다 왼쪽에서 시작하는 상자(목차 밑에 깔린 전폭 배경·히어로 이미지), overflow 로 잘려 보이지 않는 부분.
 */
export async function measureConnector(page: Page): Promise<ConnectorSample> {
  return page.evaluate(({ marginTop, marginBottom }) => {
    type Box = { left: number; top: number; right: number; bottom: number };
    const inside = (p: { x: number; y: number }, box: Box) => p.x > box.left && p.x < box.right && p.y > box.top && p.y < box.bottom;
    const CHROME = '.story-header,.story-rail,.story-connector,.story-mobile-menu,.story-mobile-services,.story-mobile-chapter,.dg-sr-only';
    const root = document.querySelector<HTMLElement>('.story-root')!;
    const svg = document.querySelector<SVGSVGElement>('.story-connector')!;
    const path = svg.querySelector('path')!, circle = svg.querySelector('circle')!;
    const active = [...document.querySelectorAll<HTMLAnchorElement>('.story-rail a[aria-current]')].pop();
    const item = active?.getAttribute('href')?.slice(1) ?? '';
    const marker = active?.querySelector(':scope > span:last-child');
    const glyphs = document.createRange();
    if (marker) glyphs.selectNodeContents(marker);
    const label = marker ? glyphs.getBoundingClientRect() : undefined; // 눈에 보이는 글자 상자
    const middle = (box?: Box) => (box ? (box.top + box.bottom) / 2 : NaN);
    const painted = (style: CSSStyleDeclaration) => !/^(transparent|rgba\(.*,\s*0\)|.*\/\s*0\))$/.test(style.backgroundColor) || style.backgroundImage !== 'none';
    const target = document.querySelector<HTMLElement>(`#${item} [data-story-target], #${item} h2`);
    const dest = target?.getBoundingClientRect();
    const headerBottom = document.querySelector('.story-header')?.getBoundingClientRect().bottom ?? 0;
    const section = item ? document.getElementById(item)?.getBoundingClientRect() : undefined;
    const gutter = target?.closest('.story-inner')?.getBoundingClientRect().left;

    const shown = (node: Element) => {
      for (let el: Element | null = node; el && el !== document.documentElement; el = el.parentElement) {
        const style = getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) <= 0.01) return false;
      }
      return true;
    };
    const total = shown(path) && path.getAttribute('d') ? path.getTotalLength() : 0;
    const lineShown = total > 0;
    const dotBox = circle.getBoundingClientRect();
    const dotShown = shown(circle) && dotBox.width > 0;

    // 선 위의 점들(뷰포트 좌표).
    const matrix = path.getScreenCTM();
    const points: { x: number; y: number }[] = [];
    if (lineShown && matrix) {
      for (let at = 0; at <= total; at += 1) {
        const p = path.getPointAtLength(at);
        points.push({ x: p.x * matrix.a + p.y * matrix.c + matrix.e, y: p.x * matrix.b + p.y * matrix.d + matrix.f });
      }
    }
    const start = points[0], end = points[points.length - 1];
    // 목차(z-index 210)는 연결선(205)보다 위다. 배경이 칠해진 목차 항목 밑의 선은 보이지 않는다.
    const covers = [...document.querySelectorAll('.story-rail a')].filter((link) => painted(getComputedStyle(link))).map((link) => link.getBoundingClientRect());
    const emerges = points.findIndex((p) => !covers.some((box) => inside(p, box)));
    const reach: Box = { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity };
    const grow = (box: Box) => { reach.left = Math.min(reach.left, box.left); reach.top = Math.min(reach.top, box.top); reach.right = Math.max(reach.right, box.right); reach.bottom = Math.max(reach.bottom, box.bottom); };
    for (const p of points) grow({ left: p.x, top: p.y, right: p.x, bottom: p.y });
    if (dotShown) grow(dotBox);

    /** overflow 로 잘린 뒤 실제로 보이는 부분. 보이는 부분이 없으면 null. */
    const clip = (rect: Box, from: Element | null): Box | null => {
      const box = { left: Math.max(rect.left, 0), top: Math.max(rect.top, 0), right: Math.min(rect.right, innerWidth), bottom: Math.min(rect.bottom, innerHeight) };
      for (let el = from; el && el !== root; el = el.parentElement) {
        if (getComputedStyle(el).overflow === 'visible') continue;
        const edge = el.getBoundingClientRect();
        box.left = Math.max(box.left, edge.left); box.top = Math.max(box.top, edge.top);
        box.right = Math.min(box.right, edge.right); box.bottom = Math.min(box.bottom, edge.bottom);
      }
      return box.right - box.left > 0.5 && box.bottom - box.top > 0.5 ? box : null;
    };
    let overlapPx = 0, overlapWith = '';
    const consider = (rect: Box, owner: Element, kind: string) => {
      if (rect.right <= reach.left || rect.left >= reach.right || rect.bottom <= reach.top || rect.top >= reach.bottom) return;
      const box = clip(rect, owner.parentElement);
      if (!box) return;
      let hit = 0;
      for (const p of points) if (inside(p, box)) hit += 1;
      if (dotShown) hit = Math.max(hit, Math.min(Math.min(dotBox.right, box.right) - Math.max(dotBox.left, box.left), Math.min(dotBox.bottom, box.bottom) - Math.max(dotBox.top, box.top)));
      if (hit > overlapPx) {
        overlapPx = hit;
        const name = owner.id ? `#${owner.id}` : owner.classList.length ? `.${[...owner.classList].join('.')}` : '';
        overlapWith = `${kind}:${owner.tagName.toLowerCase()}${name} "${(owner.textContent ?? '').trim().slice(0, 16)}"`;
      }
    };
    if (lineShown || dotShown) {
      const visible = (el: Element) => !el.closest(CHROME) && el.checkVisibility({ visibilityProperty: true });
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const range = document.createRange();
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const owner = node.parentElement;
        if (!owner || !node.textContent?.trim() || !visible(owner)) continue;
        range.selectNodeContents(node);
        for (const rect of range.getClientRects()) consider(rect, owner, 'text');
      }
      const railEdge = start?.x ?? label?.right ?? 0; // 이보다 왼쪽에서 시작하는 상자는 목차 밑에 깔린 전폭 배경이다
      for (const el of root.querySelectorAll<HTMLElement>('*')) {
        const tag = el.tagName.toLowerCase();
        if (tag === 'section' || tag === 'main' || !visible(el)) continue;
        const rect = el.getBoundingClientRect();
        if (rect.width < 1 || rect.height < 1 || rect.bottom <= 0 || rect.top >= innerHeight || rect.left <= railEdge) continue;
        if (['img', 'picture', 'video', 'canvas'].includes(tag)) { consider(rect, el, 'media'); continue; }
        if (target && el.contains(target)) continue;
        const style = getComputedStyle(el);
        const framed = ['Top', 'Right', 'Bottom', 'Left'].every((side) => parseFloat(style.getPropertyValue(`border-${side.toLowerCase()}-width`)) > 0 && style.getPropertyValue(`border-${side.toLowerCase()}-style`) !== 'none');
        if (painted(style) || framed) consider(rect, el, 'card');
      }
    }

    const destination = !dest || dest.bottom <= headerBottom || dest.top >= innerHeight ? 'out'
      : dest.top >= marginTop && dest.bottom <= innerHeight - marginBottom ? 'in' : 'partial';
    const round = (value: number | undefined) => Math.round((value ?? NaN) * 10) / 10;
    return {
      width: innerWidth, scrollY: Math.round(scrollY), item, lineShown, dotShown, destination,
      overlapPx: Math.round(overlapPx * 10) / 10, overlapWith,
      startGap: round(start && label ? start.x - label.right : undefined),
      startOffsetY: round(start ? start.y - middle(label) : undefined),
      visibleStartOffsetY: round(emerges >= 0 ? points[emerges].y - middle(label) : undefined), hiddenStartPx: Math.max(emerges, 0),
      markerDeltaY: round(middle(marker?.getBoundingClientRect()) - middle(label)),
      endY: round(end?.y), dotY: round(dotShown ? dotBox.top + dotBox.height / 2 : undefined),
      destTop: round(dest?.top), destBottom: round(dest?.bottom),
      secTop: round(section?.top), secBottom: round(section?.bottom), headerBottom: round(headerBottom), viewHeight: innerHeight,
      endX: round(end?.x), gutterX: round(gutter === undefined ? undefined : gutter - 18),
      marked: svg.hasAttribute('data-visible'), opacity: Number(getComputedStyle(svg).opacity),
    } as const;
  }, { marginTop: IN_VIEW_MARGIN.top, marginBottom: IN_VIEW_MARGIN.bottom });
}

/** 목차 활성 항목과 연결선 모양이 연속 3프레임 같을 때까지 기다린다(고정 sleep 없음, 최대 90프레임). */
export async function settleConnector(page: Page) {
  await page.evaluate(() => new Promise<void>((resolve) => {
    let last = '', same = 0, frames = 0;
    const tick = () => {
      const svg = document.querySelector('.story-connector');
      const path = svg?.querySelector('path'), circle = svg?.querySelector('circle');
      const style = (el?: Element | null) => (el ? `${getComputedStyle(el).display}/${getComputedStyle(el).opacity}` : '');
      const now = [scrollY, [...document.querySelectorAll('.story-rail a[aria-current]')].map((a) => a.getAttribute('href')).join(), path?.getAttribute('d'), circle?.getAttribute('cy'), style(svg), style(path), style(circle)].join('|');
      same = now === last ? same + 1 : 0; last = now; frames += 1;
      if (same >= 3 || frames >= 90) resolve(); else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }));
}

/** 한 폭에서 문서 처음부터 끝까지 step px 간격으로 내리며 표본을 모은다. 활성 항목은 목차가 스스로 정한 것을 읽는다. */
export async function sweepConnector(page: Page, width: number, height: number, step = 150): Promise<ConnectorSample[]> {
  await page.setViewportSize({ width, height });
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await settleConnector(page);
  const bottom = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const samples: ConnectorSample[] = [];
  for (let top = 0; top < bottom + step; top += step) {
    await page.evaluate((y) => scrollTo({ top: y, behavior: 'instant' }), Math.min(top, bottom));
    await settleConnector(page);
    samples.push(await measureConnector(page));
  }
  return samples;
}

export type ConnectorSummary = { width: number; item: string; samples: number; shown: number; overlapped: number; maxOverlapPx: number; worst: string; strayWhileOut: number; inView: number };

/** 폭·항목별 요약: 겹친 표본 수 / 전체, 최대 겹침 px, 목적지가 화면 밖인데 선이 보인 표본 수. */
export function summarize(samples: ConnectorSample[], tolerance = 1): ConnectorSummary[] {
  const rows = new Map<string, ConnectorSummary>();
  for (const sample of samples) {
    const key = `${sample.width}/${sample.item}`;
    const row = rows.get(key) ?? { width: sample.width, item: sample.item, samples: 0, shown: 0, overlapped: 0, maxOverlapPx: 0, worst: '', strayWhileOut: 0, inView: 0 };
    const shown = sample.lineShown || sample.dotShown;
    row.samples += 1; row.shown += Number(shown); row.inView += Number(sample.destination === 'in');
    row.overlapped += Number(shown && sample.overlapPx > tolerance);
    row.strayWhileOut += Number(shown && sample.destination === 'out');
    if (shown && sample.overlapPx > row.maxOverlapPx) { row.maxOverlapPx = sample.overlapPx; row.worst = `y=${sample.scrollY} ${sample.overlapWith}`; }
    rows.set(key, row);
  }
  return [...rows.values()];
}
