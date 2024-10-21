'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { TCategory } from '@/app/[locale]/(main)/recipes/types';
import {
  Card,
  Tooltip,
  Carousel,
  Skeleton,
  NextButton,
  PrevButton,
  CarouselItem,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
  CarouselContent,
} from '@/app/components/common';
import { useMealsByCategory } from '@/hooks/apis';
import { Link } from '@/i18n/routing';

export default function RecipeCarousel({ category }: { category: TCategory }) {
  const { meals, isLoadingMeals } = useMealsByCategory(category.strCategory);

  const t = useTranslations('Recipes');

  return (
    <div className="mt-16">
      <div className="pl-6 text-lg text-my-neutral-600 dark:text-my-neutral-100 sm:pl-[42px]">
        {category.strCategory}
      </div>
      <Carousel className="mt-9">
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
                <Link href={`/recipes/${meal.idMeal}`}>
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
                </Link>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <PrevButton className="right-[104px] size-[46px] dark:bg-my-neutral-700" />
        <NextButton className="right-[42px] size-[46px] dark:bg-my-neutral-700" />
      </Carousel>
    </div>
  );
}
