'use client';

import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';
import Image from 'next/image';

import { ContentLayout } from '@/app/components';
import {
  Card,
  Tooltip,
  Skeleton,
  ScrollBar,
  ScrollArea,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/app/components/common';
import { cn } from '@/app/lib/utils';
import { useCategories } from '@/hooks/apis';
import {
  SearchBar,
  RecipeCarousel,
} from '@/app/[locale]/(main)/recipes/components';
import { fetcher } from '@/app/lib/fetcher';
import { TMeal } from '@/app/[locale]/(main)/recipes/types';
import { apiConfig } from '@/config';

export default function Recipes() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchText, setSearchText] = useState<string>('');
  const { categories, isLoadingCategories } = useCategories();

  const t = useTranslations('Recipes');

  const handleSearch = useCallback((value: string) => {
    setSearchText(value);
  }, []);

  const { data: mealsData, isLoading } = useSWR<{ meals: TMeal[] }>(
    `${apiConfig.baseUrl}/${apiConfig.version}/${apiConfig.apiKey}/search.php?s=${searchText}`,
    fetcher,
    {
      errorRetryCount: 3,
    }
  );

  return (
    <ContentLayout title={t('title')}>
      <SearchBar onSearch={handleSearch} />
      {searchText && (
        <div className="mt-4">
          <div className="px-6 text-my-neutral-600 dark:text-my-neutral-100 sm:px-[42px]">
            <div className="text-lg">
              {isLoading ? (
                <div>{t('searching')}</div>
              ) : (
                t('search_result', {
                  count: mealsData?.meals?.length ?? 0,
                  searchText,
                })
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-1 sm:gap-3 xl:gap-6">
              {mealsData?.meals?.map((meal) => (
                <Card
                  key={meal.idMeal}
                  className="flex h-[198px] w-[160px] flex-col items-center border-none px-4 py-3 shadow-lg dark:bg-my-neutral-700 sm:w-[177px]"
                >
                  <Image
                    width={100}
                    height={100}
                    alt={meal.strMeal}
                    className="rounded-full"
                    src={meal.strMealThumb}
                  />
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger>
                        <div className="mt-6 line-clamp-2 max-w-[145px] text-center text-my-neutral-800 dark:text-my-neutral-0">
                          {meal.strMeal}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        {meal.strMeal}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
      {!searchText && (
        <>
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
        </>
      )}
    </ContentLayout>
  );
}
