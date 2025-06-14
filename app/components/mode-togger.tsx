'use client';

import * as React from 'react';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
} from '@radix-ui/react-tooltip';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { Button } from '@/app/components/common';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const t = useTranslations('Layout');

  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            className="mr-2 h-8 w-8 rounded-full border-my-neutral-400 bg-background"
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform duration-500 ease-in-out dark:rotate-0 dark:scale-100 dark:text-my-neutral-0" />
            <MoonIcon className="scale-1000 absolute h-[1.2rem] w-[1.2rem] rotate-0 transition-transform duration-500 ease-in-out dark:-rotate-90 dark:scale-0" />
            <span className="sr-only">{t('switch_theme')}</span>
          </Button>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
}
