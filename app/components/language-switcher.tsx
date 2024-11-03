'use client';

import { GlobeIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/app/components/common';
import { Locale } from '@/i18n/locales';
import { usePathname, useRouter } from '@/i18n/routing';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Layout.language');

  const handleLocaleChange = (newLocale: Locale) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex size-8 items-center justify-center rounded-full border border-my-neutral-500 dark:border-my-primary-500">
          <GlobeIcon
            size={20}
            className="text-my-neutral-300 hover:text-my-neutral-800 dark:text-my-neutral-0"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t('title')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={locale === 'en'}
          onClick={() => {
            handleLocaleChange('en');
          }}
        >
          {t('english')}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={locale === 'vi'}
          onClick={() => {
            handleLocaleChange('vi');
          }}
        >
          {t('vietnam')}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
