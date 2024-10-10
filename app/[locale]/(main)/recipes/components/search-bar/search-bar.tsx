import { ChangeEvent, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { SlidersHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button, Input } from '@/app/components/common';

import { TSearchBarProps } from './types';

const DEBOUNCE_TIME_MS = 500;

export default function SearchBar({ onSearch }: TSearchBarProps) {
  const t = useTranslations('Recipes');

  const handleChangeText = useMemo(
    () =>
      debounce(async (event: ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
      }, DEBOUNCE_TIME_MS),
    [onSearch]
  );

  return (
    <div className="mx-6 mb-16 flex gap-3 rounded-[20px] bg-white p-6 shadow-md dark:bg-my-neutral-700 sm:mx-[42px]">
      <div className="relative w-full">
        <Input
          placeholder={t('search')}
          className="h-[54px] w-full rounded-2xl p-4 dark:border-my-neutral-600"
          onChange={handleChangeText}
        />
        <MagnifyingGlassIcon className="absolute right-3 top-4 h-5 w-5 cursor-pointer text-gray-400" />
      </div>

      <Button className="h-[54px] rounded-2xl text-my-neutral-0">
        <SlidersHorizontal className="mr-[10px]" />
        {t('filters')}
      </Button>
    </div>
  );
}
