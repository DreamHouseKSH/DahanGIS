'use client';

import { ReactNode } from 'react';

/**
 * CloudHero 컴포넌트 Props
 */
interface CloudHeroProps {
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
 * Cloud Dancer 테마 Hero 섹션 컴포넌트
 * 차분하고 평온한 느낌의 히어로 영역
 */
export default function CloudHero({
  title,
  subtitle,
  children,
  illustration,
  ctaButtons,
  className = '',
  minHeight = '100vh',
  centered = true,
}: CloudHeroProps) {
  return (
    <section
      className={`v3-hero ${className}`.trim()}
      style={{ minHeight }}
    >
      <div className="container">
        <div className={`row align-items-center ${centered ? 'justify-content-center' : ''}`}>
          {/* 컨텐츠 영역 */}
          <div className={`col-lg-${illustration ? '6' : '12'} ${centered && !illustration ? 'text-center' : ''}`}>
            <div className="v3-hero-content">
              <h1 className="v3-hero-title">{title}</h1>
              {subtitle && (
                <p className="v3-hero-subtitle">{subtitle}</p>
              )}
              {children}
              {ctaButtons && (
                <div className="v3-hero-cta">
                  {ctaButtons}
                </div>
              )}
            </div>
          </div>

          {/* 일러스트레이션 영역 */}
          {illustration && (
            <div className="col-lg-6">
              <div className="v3-illustration-container v3-animate-fadeInUp v3-delay-3">
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
  variant?: 'primary' | 'sage' | 'outline';
  className?: string;
}

export function HeroButton({
  href,
  children,
  variant = 'primary',
  className = '',
}: HeroButtonProps) {
  const variantClass = variant === 'sage'
    ? 'v3-btn-sage'
    : variant === 'outline'
      ? 'v3-btn-outline'
      : 'v3-btn-primary';

  return (
    <a
      href={href}
      className={`v3-btn ${variantClass} ${className}`.trim()}
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
    <section className={`v3-hero ${className}`.trim()} style={{ minHeight: '40vh' }}>
      <div className="container">
        <div className="text-center">
          {breadcrumb && (
            <p className="v3-hero-breadcrumb mb-3" style={{ color: 'var(--v3-text-muted)' }}>
              <i className="bi bi-house-door me-2" />
              {breadcrumb}
            </p>
          )}
          <h1 className="v3-hero-title">{title}</h1>
          {subtitle && (
            <p className="v3-hero-subtitle" style={{ marginBottom: 0 }}>{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  );
}
