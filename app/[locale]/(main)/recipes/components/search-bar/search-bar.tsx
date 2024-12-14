'use client';

import { ChangeEvent, useMemo, useRef, useState } from 'react';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import debounce from 'lodash.debounce';
import { CircleX, SlidersHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button, Input } from '@/app/components/common';

import { TSearchBarProps } from './types';

const DEBOUNCE_TIME_MS = 1000;

export default function SearchBar({ onSearch }: TSearchBarProps) {
  const [hasValue, setHasValue] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('Recipes');

  const handleChangeText = useMemo(
    () =>
      debounce((event: ChangeEvent<HTMLInputElement>) => {
        setHasValue(!!event.target.value);
        onSearch(event.target.value);
      }, DEBOUNCE_TIME_MS),
    [onSearch]
  );

  const handleClearSearchText = () => {
    if (inputRef?.current) {
      inputRef.current.value = '';
      setHasValue(false);
      onSearch('');
    }
  };

  return (
    <div className="mx-6 mb-10 flex gap-3 rounded-[20px] bg-white p-6 shadow-md dark:bg-my-neutral-700 sm:mx-[42px]">
      <div className="relative w-full">
        <Input
          ref={inputRef}
          placeholder={t('search')}
          className="h-[54px] w-full rounded-2xl p-4 dark:border-my-neutral-600"
          onChange={handleChangeText}
        />
        {hasValue ? (
          <CircleX
            className="absolute right-3 top-4 h-5 w-5 cursor-pointer text-my-danger-500"
            onClick={handleClearSearchText}
          />
        ) : (
          <MagnifyingGlassIcon className="pointer-events-none absolute right-3 top-4 h-5 w-5 text-gray-400" />
        )}
      </div>

      <Button className="h-[54px] rounded-2xl text-my-neutral-0">
        <SlidersHorizontal className="mr-[10px]" />
        {t('filters')}
      </Button>
    </div>
  );
}
