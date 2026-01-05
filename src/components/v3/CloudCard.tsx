'use client';

import { ReactNode } from 'react';

/**
 * CloudCard 컴포넌트 Props
 */
interface CloudCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'service';
  hoverable?: boolean;
  onClick?: () => void;
}

/**
 * Cloud Dancer 테마 카드 컴포넌트
 * 부드러운 글래스모피즘 효과가 적용된 차분한 카드 디자인
 */
export default function CloudCard({
  children,
  className = '',
  variant = 'default',
  hoverable = true,
  onClick,
}: CloudCardProps) {
  // 변형에 따른 클래스 결정
  const variantClass = variant === 'strong'
    ? 'v3-glass-card-strong'
    : variant === 'service'
      ? 'v3-service-card'
      : '';

  // hoverable이 false면 hover 효과 비활성화
  const hoverClass = hoverable ? '' : 'no-hover';

  return (
    <div
      className={`v3-glass-card ${variantClass} ${hoverClass} ${className}`.trim()}
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
 * CloudCard Body 컴포넌트
 */
interface CloudCardBodyProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function CloudCardBody({ children, className = '', style }: CloudCardBodyProps) {
  return (
    <div className={`v3-glass-card-body ${className}`.trim()} style={style}>
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
    <div className={`v3-service-card ${className}`.trim()}>
      <div className="v3-service-icon">
        {icon}
      </div>
      <h3 className="v3-service-title">{title}</h3>
      <p className="v3-service-description">{description}</p>
      {link && (
        <a href={link} className="v3-service-link">
          {linkText} <i className="bi bi-arrow-right" />
        </a>
      )}
    </div>
  );
}
