import { ReactNode } from 'react';

import { setRequestLocale } from 'next-intl/server';

import { AuthNavbar } from '@/app/components';
import { cn } from '@/app/lib/utils';

export default function AuthLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <>
      <AuthNavbar />
      <main
        className={cn(
          'min-h-[calc(100vh_-_80px)] bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-my-neutral-800'
        )}
      >
        {children}
      </main>
    </>
  );
}
