import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { SlidersHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button, Input } from '@/app/components/common';

export default function SearchBar() {
  const t = useTranslations('Recipes');

  const handleSearch = () => {
    console.log('Clicked search icon');
  };

  return (
    <div className="mx-6 mb-16 flex gap-3 rounded-[20px] bg-white p-6 shadow-md dark:bg-my-neutral-700 sm:mx-[42px]">
      <div className="relative w-full">
        <Input
          placeholder={t('search')}
          className="h-[54px] w-full rounded-2xl p-4 dark:border-my-neutral-600"
        />
        <MagnifyingGlassIcon
          className="absolute right-3 top-4 h-5 w-5 cursor-pointer text-gray-400"
          onClick={handleSearch}
        />
      </div>

      <Button className="h-[54px] rounded-2xl text-my-neutral-0">
        <SlidersHorizontal className="mr-[10px]" />
        {t('filters')}
      </Button>
    </div>
  );
}
