import type { ReactNode } from 'react';
import { pageMetadata } from '../../lib/site-metadata';
export const metadata = pageMetadata('/about/');
export default function Layout({ children }: { children: ReactNode }) { return children; }
