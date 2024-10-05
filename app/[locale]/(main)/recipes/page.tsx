'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { ContentLayout } from '@/app/components';
import {
  Card,
  Tooltip,
  Carousel,
  Skeleton,
  ScrollBar,
  ScrollArea,
  NextButton,
  PrevButton,
  CarouselItem,
  TooltipTrigger,
  TooltipContent,
  CarouselContent,
  TooltipProvider,
} from '@/app/components/common';
import { cn } from '@/app/lib/utils';

import { TCategory, TMeal } from './types';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function useMealsByCategory(category: string) {
  const { data, isLoading } = useSWR<{ meals: TMeal[] }>(
    `http://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
    fetcher
  );

  return {
    meals: data?.meals ?? [],
    isLoading,
  };
}

export default function Recipes() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Beef');

  const { data: categoriesData, isLoading: isLoadingCategories } = useSWR<{
    categories: TCategory[];
  }>('https://www.themealdb.com/api/json/v1/1/categories.php', fetcher);

  const { meals, isLoading: isLoadingMeals } =
    useMealsByCategory(selectedCategory);

  const t = useTranslations('Recipes');

  return (
    <ContentLayout title={t('title')}>
      <ScrollArea>
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
          {categoriesData?.categories.map((category) => (
            <div
              className={cn(
                'cursor-pointer rounded-2xl px-6 py-3 hover:bg-my-secondary-700',
                selectedCategory === category.strCategory &&
                  'rounded-2xl bg-my-secondary-700 px-6 py-3'
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
      <Carousel className="mt-[102px]">
        {!meals.length && !isLoadingMeals && <div>{t('no_data_found')}</div>}
        {isLoadingMeals && (
          <div className="flex gap-4">
            {Array(2)
              .fill('')
              .map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-[174px] w-[177px] rounded-xl"
                />
              ))}
          </div>
        )}
        <CarouselContent>
          {meals.map((meal) => (
            <CarouselItem
              key={meal.idMeal}
              className="basis-1/2 pb-4 sm:basis-1/3 lg:basis-1/4 xl:basis-1/6"
            >
              <Card className="m-3 flex h-[198px] w-[177px] flex-col items-center px-4 py-3">
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
                      <div className="mt-6 line-clamp-2 max-w-[145px] text-center">
                        {meal.strMeal}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      {meal.strMeal}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <PrevButton className="size-[46px]" />
        <NextButton className="size-[46px]" />
      </Carousel>
    </ContentLayout>
  );
}
