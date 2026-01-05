'use client';

import { ReactNode } from 'react';

/**
 * CloudBackground 컴포넌트 Props
 */
interface CloudBackgroundProps {
  children: ReactNode;
  withClouds?: boolean;
  className?: string;
}

/**
 * Cloud Dancer 테마 배경 컴포넌트
 * 2026년 팬톤 컬러 "클라우드 댄서"를 적용한 차분하고 평온한 배경
 */
export default function CloudBackground({
  children,
  withClouds = true,
  className = '',
}: CloudBackgroundProps) {
  return (
    <div className={`v3-gradient-wrapper ${className}`.trim()}>
      {/* 클라우드 댄서 배경 */}
      <div className="v3-cloud-bg" />

      {/* 플로팅 클라우드 */}
      {withClouds && <FloatingClouds />}

      {/* 컨텐츠 */}
      <div className="v3-gradient-content">
        {children}
      </div>
    </div>
  );
}

/**
 * 플로팅 클라우드 컴포넌트
 * 배경에 부드럽게 떠다니는 장식 요소
 */
export function FloatingClouds() {
  return (
    <div className="v3-floating-clouds" aria-hidden="true">
      <div className="v3-cloud v3-cloud-1" />
      <div className="v3-cloud v3-cloud-2" />
      <div className="v3-cloud v3-cloud-3" />
    </div>
  );
}

/**
 * 섹션 배경 컴포넌트
 * 특정 섹션에 적용할 수 있는 간단한 배경
 */
interface SectionBackgroundProps {
  children: ReactNode;
  variant?: 'light' | 'cloud' | 'mist';
  className?: string;
}

export function SectionBackground({
  children,
  variant = 'light',
  className = '',
}: SectionBackgroundProps) {
  const bgClass = variant === 'cloud'
    ? 'v3-bg-cloud'
    : variant === 'mist'
      ? 'v3-bg-mist'
      : 'v3-bg-light';

  return (
    <div className={`${bgClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
