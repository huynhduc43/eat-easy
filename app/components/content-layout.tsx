import { ReactNode } from 'react';

import { Navbar } from '@/app/components';

interface ContentLayoutProps {
  title: string;
  children: ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} />
      <div className="pb-8 pt-8">{children}</div>
    </div>
  );
}
