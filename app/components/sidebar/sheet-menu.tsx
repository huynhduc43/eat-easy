import Link from 'next/link';
import { MenuIcon } from 'lucide-react';

import {
  Sheet,
  Button,
  Avatar,
  SheetHeader,
  AvatarImage,
  SheetTrigger,
  SheetContent,
  AvatarFallback,
} from '@/app/components/common';
import { Menu } from '@/app/components/sidebar';

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="flex h-full flex-col !rounded-r-[20px] border-0 bg-my-neutral-900 px-0 sm:w-72"
        side="left"
      >
        <SheetHeader className="mb-20">
          <Button
            className="flex h-20 items-center justify-center pt-1"
            variant="link"
            asChild
          >
            <Link href="/dashboard" className="flex items-center">
              <div className="text-2xl leading-10">
                <span className="text-my-neutral-100">Eat</span>
                <span className="font-bold text-my-tertiary-700">Easy</span>
              </div>
            </Link>
          </Button>
          <hr className="border-b-[1.5px] border-t-0 border-my-neutral-700" />
          <div className="relative mx-[30px] !mt-5 mb-[62px] flex justify-center gap-[22px] text-my-neutral-0">
            <div className="relative flex justify-center">
              <div className="absolute -inset-[14px] h-24 w-24 rounded-full border-2 border-gray-700"></div>
              <div className="absolute -inset-[7px] h-[82px] w-[82px] rounded-full border-2 border-gray-600"></div>
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
              <Link href="/onboarding">View Profile</Link>
            </div>
          </div>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
