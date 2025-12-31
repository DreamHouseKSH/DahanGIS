'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// 버전 타입 정의
type Version = 'v1' | 'v2';

// 컨텍스트 타입 정의
interface VersionContextType {
  version: Version;
  setVersion: (version: Version) => void;
  toggleVersion: () => void;
  isV2: boolean;
}

// 기본값으로 컨텍스트 생성
const VersionContext = createContext<VersionContextType>({
  version: 'v1',
  setVersion: () => {},
  toggleVersion: () => {},
  isV2: false,
});

// 커스텀 훅: 버전 컨텍스트 사용
export function useVersion() {
  const context = useContext(VersionContext);
  if (!context) {
    throw new Error('useVersion은 VersionProvider 내부에서 사용해야 합니다');
  }
  return context;
}

// 버전 프로바이더 컴포넌트
interface VersionProviderProps {
  children: ReactNode;
}

export function VersionProvider({ children }: VersionProviderProps) {
  const [version, setVersionState] = useState<Version>('v1');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // 클라이언트 마운트 확인 및 localStorage에서 버전 복원
  useEffect(() => {
    setMounted(true);

    // 현재 경로가 /v2로 시작하면 v2로 설정
    if (pathname?.startsWith('/v2')) {
      setVersionState('v2');
      return;
    }

    // localStorage에서 저장된 버전 확인
    const savedVersion = localStorage.getItem('site-version') as Version;
    if (savedVersion && (savedVersion === 'v1' || savedVersion === 'v2')) {
      setVersionState(savedVersion);
    }
  }, [pathname]);

  // 버전 변경 함수
  const setVersion = (newVersion: Version) => {
    setVersionState(newVersion);

    if (typeof window !== 'undefined') {
      localStorage.setItem('site-version', newVersion);
    }

    // 버전에 따라 경로 변경
    if (newVersion === 'v2') {
      // v1에서 v2로 전환 시 /v2 경로로 이동
      if (pathname && !pathname.startsWith('/v2')) {
        const newPath = pathname === '/' ? '/v2' : `/v2${pathname}`;
        router.push(newPath);
      }
    } else {
      // v2에서 v1으로 전환 시 /v2 제거
      if (pathname?.startsWith('/v2')) {
        const newPath = pathname.replace('/v2', '') || '/';
        router.push(newPath);
      }
    }
  };

  // 버전 토글 함수
  const toggleVersion = () => {
    const newVersion = version === 'v1' ? 'v2' : 'v1';
    setVersion(newVersion);
  };

  // isV2 계산
  const isV2 = version === 'v2';

  // SSR 중에는 기본값 반환
  if (!mounted) {
    return (
      <VersionContext.Provider
        value={{
          version: 'v1',
          setVersion: () => {},
          toggleVersion: () => {},
          isV2: false,
        }}
      >
        {children}
      </VersionContext.Provider>
    );
  }

  return (
    <VersionContext.Provider
      value={{
        version,
        setVersion,
        toggleVersion,
        isV2,
      }}
    >
      {children}
    </VersionContext.Provider>
  );
}

export default VersionContext;
