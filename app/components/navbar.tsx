import { ModeToggle } from '@/app/components';
import { SheetMenu } from '@/app/components/sidebar';

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 w-full shadow backdrop-blur dark:shadow-secondary">
      <div className="mx-4 flex h-20 items-center sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
