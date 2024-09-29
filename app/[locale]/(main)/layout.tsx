'use client';

import { ReactNode } from 'react';
import { useStore } from 'zustand';

import { Sidebar } from '@/app/components/sidebar';
import { useSidebarToggle } from '@/app/hooks';
import { cn } from '@/app/lib/utils';

export default function MainLayout({ children }: { children: ReactNode }) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          'min-h-[calc(100vh_-_56px)] bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-my-neutral-800',
          sidebar?.isOpen === false ? 'lg:ml-36' : 'lg:ml-[260px]'
        )}
      >
        {children}
      </main>
    </>
  );
}
