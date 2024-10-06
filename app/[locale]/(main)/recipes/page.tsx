'use client';

import { useState } from 'react';
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
import { useCategories, useMealsByCategory } from '@/hooks/apis';

export default function Recipes() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Beef');
  const { categories, isLoadingCategories } = useCategories();
  const { meals, isLoadingMeals } = useMealsByCategory(selectedCategory);

  const t = useTranslations('Recipes');

  return (
    <ContentLayout title={t('title')}>
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
      <Carousel className="mt-[102px]">
        {!meals.length && !isLoadingMeals && <div>{t('no_data_found')}</div>}
        {isLoadingMeals && (
          <div className="flex gap-4 pl-6 sm:pl-[42px]">
            {Array(2)
              .fill('')
              .map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-[198px] w-[177px] rounded-xl"
                />
              ))}
          </div>
        )}
        <CarouselContent className="pb-4 pl-6 sm:pl-[42px]">
          {meals.map((meal) => (
            <CarouselItem
              key={meal.idMeal}
              className="b m-0 basis-1/2 pb-4 sm:basis-1/3 lg:basis-1/4 xl:basis-1/6"
            >
              <Card className="flex h-[198px] w-[177px] flex-col items-center border-none px-4 py-3 shadow-lg dark:bg-my-neutral-700">
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <PrevButton className="right-[104px] size-[46px] dark:bg-my-neutral-700" />
        <NextButton className="right-[42px] size-[46px] dark:bg-my-neutral-700" />
      </Carousel>
    </ContentLayout>
  );
}
