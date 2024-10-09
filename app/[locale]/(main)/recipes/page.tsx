'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { ContentLayout } from '@/app/components';
import { Skeleton, ScrollBar, ScrollArea } from '@/app/components/common';
import { cn } from '@/app/lib/utils';
import { useCategories } from '@/hooks/apis';
import {
  SearchBar,
  RecipeCarousel,
} from '@/app/[locale]/(main)/recipes/components';

export default function Recipes() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { categories, isLoadingCategories } = useCategories();

  const t = useTranslations('Recipes');

  return (
    <ContentLayout title={t('title')}>
      <SearchBar />
      <ScrollArea className="px-6 sm:px-[42px]">
        <div className="flex gap-2">
          {isLoadingCategories &&
            Array(10)
              .fill('')
              .map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-12 w-32 rounded-2xl px-6 py-3"
                />
              ))}
          {categories.map((category) => (
            <div
              className={cn(
                'cursor-pointer rounded-2xl px-6 py-3 text-my-neutral-600 hover:bg-my-secondary-700 hover:text-my-neutral-0 dark:text-my-neutral-100 dark:hover:text-my-neutral-800',
                selectedCategory === category.strCategory &&
                  'rounded-2xl bg-my-secondary-700 px-6 py-3 text-my-neutral-0 dark:text-my-neutral-800'
              )}
              onClick={() => setSelectedCategory(category.strCategory)}
              key={category.idCategory}
            >
              {category.strCategory}
            </div>
          ))}
        </div>
        <ScrollBar className="hidden" orientation="horizontal" />
      </ScrollArea>
      {selectedCategory === 'All' ? (
        categories
          .filter((category) => category.strCategory !== 'All')
          .map((category) => (
            <RecipeCarousel key={category.idCategory} category={category} />
          ))
      ) : (
        <RecipeCarousel
          category={
            categories.filter(
              (category) => category.strCategory === selectedCategory
            )[0]
          }
        />
      )}
    </ContentLayout>
  );
}
