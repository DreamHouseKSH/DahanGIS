'use client';

import { ReactNode } from 'react';

/**
 * GlassHero 컴포넌트 Props
 */
interface GlassHeroProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  illustration?: ReactNode;
  ctaButtons?: ReactNode;
  className?: string;
  minHeight?: string;
  centered?: boolean;
}

/**
 * Glassmorphism 스타일 Hero 섹션 컴포넌트
 * 그라디언트 배경과 유리 효과가 적용된 히어로 영역
 */
export default function GlassHero({
  title,
  subtitle,
  children,
  illustration,
  ctaButtons,
  className = '',
  minHeight = '100vh',
  centered = true,
}: GlassHeroProps) {
  return (
    <section
      className={`v2-hero ${className}`.trim()}
      style={{ minHeight }}
    >
      <div className="container">
        <div className={`row align-items-center ${centered ? 'justify-content-center' : ''}`}>
          {/* 컨텐츠 영역 */}
          <div className={`col-lg-${illustration ? '6' : '12'} ${centered && !illustration ? 'text-center' : ''}`}>
            <div className="v2-hero-content">
              <h1 className="v2-hero-title">{title}</h1>
              {subtitle && (
                <p className="v2-hero-subtitle">{subtitle}</p>
              )}
              {children}
              {ctaButtons && (
                <div className="v2-hero-cta">
                  {ctaButtons}
                </div>
              )}
            </div>
          </div>

          {/* 일러스트레이션 영역 */}
          {illustration && (
            <div className="col-lg-6">
              <div className="v2-illustration-container v2-animate-fadeInUp v2-delay-3">
                {illustration}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Hero CTA 버튼 컴포넌트
 */
interface HeroButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'gradient' | 'outline';
  className?: string;
}

export function HeroButton({
  href,
  children,
  variant = 'primary',
  className = '',
}: HeroButtonProps) {
  const variantClass = variant === 'gradient'
    ? 'v2-btn-gradient'
    : variant === 'outline'
      ? 'v2-btn-outline'
      : 'v2-btn-primary';

  return (
    <a
      href={href}
      className={`v2-btn ${variantClass} ${className}`.trim()}
    >
      {children}
    </a>
  );
}

/**
 * 내부 페이지용 간단한 Hero 섹션
 */
interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
  className?: string;
}

export function PageHero({
  title,
  subtitle,
  breadcrumb,
  className = '',
}: PageHeroProps) {
  return (
    <section className={`v2-hero ${className}`.trim()} style={{ minHeight: '40vh' }}>
      <div className="container">
        <div className="text-center">
          {breadcrumb && (
            <p className="v2-hero-breadcrumb mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
              <i className="bi bi-house-door me-2" />
              {breadcrumb}
            </p>
          )}
          <h1 className="v2-hero-title">{title}</h1>
          {subtitle && (
            <p className="v2-hero-subtitle" style={{ marginBottom: 0 }}>{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  );
}
