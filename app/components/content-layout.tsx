import { ReactNode } from 'react';

import { Navbar } from '@/app/components';
import { cn } from '@/app/lib/utils';

interface ContentLayoutProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function ContentLayout({
  title,
  children,
  className,
}: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} />
      <div className={cn('pb-8 pt-8', className)}>{children}</div>
    </div>
  );
}
