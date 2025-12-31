'use client';

import { ReactNode } from 'react';

/**
 * GradientBackground 컴포넌트 Props
 */
interface GradientBackgroundProps {
  children: ReactNode;
  variant?: 'hero' | 'primary' | 'dark' | 'accent' | 'warm';
  withOrbs?: boolean;
  className?: string;
}

/**
 * 애니메이션 그라디언트 배경 컴포넌트
 * 플로팅 오브와 함께 동적인 배경 효과 제공
 */
export default function GradientBackground({
  children,
  variant = 'hero',
  withOrbs = true,
  className = '',
}: GradientBackgroundProps) {
  // 그라디언트 변형에 따른 스타일
  const gradientStyles: Record<string, string> = {
    hero: 'var(--gradient-hero)',
    primary: 'var(--gradient-primary)',
    dark: 'var(--gradient-dark)',
    accent: 'var(--gradient-accent)',
    warm: 'var(--gradient-warm)',
  };

  return (
    <div className={`v2-gradient-wrapper ${className}`.trim()}>
      {/* 그라디언트 배경 */}
      <div
        className="v2-gradient-bg"
        style={{
          background: gradientStyles[variant],
          backgroundSize: '400% 400%',
        }}
      />

      {/* 플로팅 오브 */}
      {withOrbs && <FloatingOrbs />}

      {/* 컨텐츠 */}
      <div className="v2-gradient-content">
        {children}
      </div>
    </div>
  );
}

/**
 * 플로팅 오브 컴포넌트
 * 배경에 떠다니는 장식 요소
 */
export function FloatingOrbs() {
  return (
    <div className="v2-floating-orbs" aria-hidden="true">
      <div className="v2-orb v2-orb-1" />
      <div className="v2-orb v2-orb-2" />
      <div className="v2-orb v2-orb-3" />
    </div>
  );
}

/**
 * 섹션 배경 컴포넌트
 * 특정 섹션에 적용할 수 있는 간단한 배경
 */
interface SectionBackgroundProps {
  children: ReactNode;
  variant?: 'light' | 'dark' | 'gradient';
  className?: string;
}

export function SectionBackground({
  children,
  variant = 'light',
  className = '',
}: SectionBackgroundProps) {
  const bgClass = variant === 'gradient'
    ? 'v2-bg-gradient'
    : variant === 'dark'
      ? 'v2-bg-dark'
      : 'v2-bg-light';

  return (
    <div className={`${bgClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
