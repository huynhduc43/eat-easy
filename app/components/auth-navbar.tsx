import { LanguageSwitcher, ModeToggle } from '@/app/components';

export function AuthNavbar() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 w-full shadow backdrop-blur dark:shadow-secondary">
      <div className="mx-6 flex h-20 items-center sm:mx-[42px]">
        <div className="flex flex-1 items-center justify-end">
          <ModeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
