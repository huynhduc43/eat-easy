'use client';

import Link from 'next/link';
import { useStore } from 'zustand';

import {
  Avatar,
  Button,
  AvatarImage,
  AvatarFallback,
} from '@/app/components/common';
import { useSidebarToggle } from '@/app/hooks';
import { cn } from '@/app/lib/utils';
import { Menu, SidebarToggle } from '@/app/components/sidebar';
import Image from 'next/image';

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
      <div className="relative flex h-full flex-col overflow-y-auto rounded-r-[20px] bg-my-neutral-800 shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            'h-20 min-h-20 transition-transform duration-300 ease-in-out',
            sidebar?.isOpen === false
              ? 'relative -left-1 translate-x-1'
              : 'translate-x-0'
          )}
          variant="link"
          asChild
        >
          <Link
            href="/dashboard"
            className="flex w-fit items-center gap-1 self-center"
          >
            <Image
              src="/images/eat-easy-logo.png"
              alt="EatEasy"
              width={40}
              height={40}
            />
            <div className="text-2xl leading-10">
              <span className="text-my-neutral-100">Eat</span>
              <span className="font-bold text-my-tertiary-700">Easy</span>
            </div>
          </Link>
        </Button>
        <hr className="border-b-[1.5px] border-t-0 border-my-neutral-700" />
        <div
          className={cn(
            'relative mx-[30px] mb-[62px] mt-5 flex justify-center gap-[22px] text-my-neutral-0',
            sidebar.isOpen ? '' : 'flex-col'
          )}
        >
          <div className="relative flex justify-center">
            <div
              className={cn(
                'absolute -inset-[14px] h-24 w-24 rounded-full border-2 border-gray-700',
                sidebar.isOpen ? '' : '-left-[7px]'
              )}
            ></div>
            <div
              className={cn(
                'absolute -inset-[7px] h-[82px] w-[82px] rounded-full border-2 border-gray-600',
                sidebar.isOpen ? '' : 'left-0'
              )}
            ></div>
            <Avatar className="h-[68px] w-[68px]">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="Carl Huynh"
              />
              <AvatarFallback className="text-my-neutral-800">
                Avatar
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col justify-center gap-[6px]">
            <p className="max-w-[110px] truncate text-base">Carl Huynh</p>
            <Link
              href="/onboarding"
              className={cn(
                'underline decoration-solid',
                sidebar.isOpen ? '' : 'text-sm leading-[22px]'
              )}
            >
              View Profile
            </Link>
          </div>
        </div>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}
