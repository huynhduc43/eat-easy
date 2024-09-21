import Link from 'next/link';
import { useStore } from 'zustand';

import { Button } from '@/app/components/common';
import { useSidebarToggle } from '@/app/hooks';
import { cn } from '@/app/lib/utils';
import { Menu, SidebarToggle } from '@/app/components/sidebar';

export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0',
        sidebar?.isOpen === false ? 'w-36' : 'w-[260px]'
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            'mb-1 transition-transform duration-300 ease-in-out',
            sidebar?.isOpen === false ? 'translate-x-1' : 'translate-x-0'
          )}
          variant="link"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="text-[1rem] leading-10">
              <span className="text-my-neutral-700">Eat</span>
              <span className="font-bold text-my-tertiary-700">Easy</span>
            </div>
          </Link>
        </Button>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}
