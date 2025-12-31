'use client';

import { useVersion } from '../contexts/VersionContext';

/**
 * 버전 토글 버튼 컴포넌트
 * v1/v2 버전 간 전환을 위한 UI 제공
 */
export default function VersionToggle() {
  const { version, toggleVersion, isV2 } = useVersion();

  return (
    <button
      className={`version-toggle ${isV2 ? 'v2-active' : ''}`}
      onClick={toggleVersion}
      title={isV2 ? 'v1 클래식 버전으로 전환' : 'v2 모던 버전으로 전환'}
      aria-label={`현재 ${version} - 클릭하여 버전 전환`}
    >
      <i className={`bi ${isV2 ? 'bi-stars' : 'bi-lightning-charge'}`} />
      <span className="d-none d-sm-inline">
        {isV2 ? 'v2' : 'v1'}
      </span>
      <span className="version-badge">
        {isV2 ? 'Modern' : 'Classic'}
      </span>
    </button>
  );
}
