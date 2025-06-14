import { ChevronLeft } from 'lucide-react';

import { Button } from '@/app/components/common';
import { cn } from '@/app/lib/utils';

interface SidebarToggleProps {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <div className="invisible absolute -right-[16px] top-[115px] z-20 lg:visible">
      <Button
        onClick={() => setIsOpen?.()}
        className="h-9 w-9 rounded-full border-my-neutral-400"
        variant="outline"
        size="icon"
      >
        <ChevronLeft
          className={cn(
            'h-4 w-4 transition-transform duration-700 ease-in-out',
            isOpen === false ? 'rotate-180' : 'rotate-0'
          )}
        />
      </Button>
    </div>
  );
}
