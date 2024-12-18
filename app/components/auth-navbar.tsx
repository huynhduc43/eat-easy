import Image from 'next/image';

import { LanguageSwitcher, ModeToggle } from '@/app/components';
import { Link } from '@/i18n/routing';

export function AuthNavbar() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 w-full shadow backdrop-blur dark:shadow-secondary">
      <div className="mx-6 flex h-20 items-center sm:mx-[42px]">
        <Link
          href="/home"
          className="flex w-fit items-center gap-1 self-center"
        >
          <Image
            src="/images/eat-easy-logo.png"
            alt="EatEasy"
            width={40}
            height={40}
          />
          <div className="text-2xl leading-10">
            <span className="dark:text-my-neutral-100 text-my-neutral-700">
              Eat
            </span>
            <span className="font-bold text-my-tertiary-700">Easy</span>
          </div>
        </Link>
        <div className="flex flex-1 items-center justify-end">
          <ModeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
