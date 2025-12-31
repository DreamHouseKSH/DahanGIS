'use client';

import { ReactNode } from 'react';

/**
 * GlassCard 컴포넌트 Props
 */
interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'service';
  hoverable?: boolean;
  onClick?: () => void;
}

/**
 * Glassmorphism 스타일 카드 컴포넌트
 * 투명한 배경과 블러 효과를 적용한 모던한 카드 디자인
 */
export default function GlassCard({
  children,
  className = '',
  variant = 'default',
  hoverable = true,
  onClick,
}: GlassCardProps) {
  // 변형에 따른 클래스 결정
  const variantClass = variant === 'strong'
    ? 'v2-glass-card-strong'
    : variant === 'service'
      ? 'v2-service-card'
      : '';

  // hoverable이 false면 hover 효과 비활성화
  const hoverClass = hoverable ? '' : 'no-hover';

  return (
    <div
      className={`v2-glass-card ${variantClass} ${hoverClass} ${className}`.trim()}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {children}
    </div>
  );
}

/**
 * GlassCard Body 컴포넌트
 */
interface GlassCardBodyProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function GlassCardBody({ children, className = '', style }: GlassCardBodyProps) {
  return (
    <div className={`v2-glass-card-body ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}

/**
 * 서비스 카드 전용 컴포넌트
 */
interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
  className?: string;
}

export function ServiceCard({
  icon,
  title,
  description,
  link,
  linkText = '자세히 보기',
  className = '',
}: ServiceCardProps) {
  return (
    <div className={`v2-service-card ${className}`.trim()}>
      <div className="v2-service-icon">
        {icon}
      </div>
      <h3 className="v2-service-title">{title}</h3>
      <p className="v2-service-description">{description}</p>
      {link && (
        <a href={link} className="v2-service-link">
          {linkText} <i className="bi bi-arrow-right" />
        </a>
      )}
    </div>
  );
}
