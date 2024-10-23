'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { ContentLayout } from '@/app/components';
import { useMealsById } from '@/hooks/apis';
import { TMeal } from '@/app/[locale]/(main)/recipes/types';
import {
  Badge,
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/app/components/common';
import { getYouTubeVideoId } from '@/app/lib/get-youtube-video-id';
import { cn } from '@/app/lib/utils';

import { TMealDetailsProps } from './types';

export default function MealDetails({ params }: TMealDetailsProps) {
  const t = useTranslations('MealDetails');

  const { meals } = useMealsById(params.mealId);
  const mealDetails = meals?.[0];

  const renderIngredientsSection = (data: TMeal) =>
    Array(20)
      .fill(0)
      .map((_, index) => {
        const ingredient = data[`strIngredient${index + 1}` as keyof TMeal];
        const measure = data[`strMeasure${index + 1}` as keyof TMeal];

        if (ingredient) {
          return (
            <div key={`strIngredient${index + 1}`} className="capitalize">
              <div>{`- ${measure} ${ingredient}`}</div>
            </div>
          );
        }

        return null;
      });

  const renderInstructionsSection = (data: TMeal) => {
    return (
      <>
        {data.strYoutube && (
          <iframe
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(data.strYoutube)}`}
            allowFullScreen
            className="aspect-video w-full rounded-xl"
          />
        )}
        <div className={cn(data.strYoutube ? 'mt-4' : '')}>
          {data.strInstructions}
        </div>
      </>
    );
  };

  return (
    <ContentLayout title={t('title')} className="mx-6 sm:mx-[42px]">
      {mealDetails && (
        <>
          <div className="flex justify-center">
            <Image
              src={mealDetails.strMealThumb}
              alt={mealDetails.strMeal}
              width={320}
              height={320}
              className="rounded-full"
              priority
            />
          </div>
          <h1 className="mt-6 text-2xl font-medium text-my-neutral-800 dark:text-my-neutral-100">
            {mealDetails.strMeal.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
              letter.toUpperCase()
            )}
          </h1>
          <div className="mb-6 flex gap-2">
            <Badge className="bg-my-secondary-700 dark:bg-my-secondary-700 dark:text-my-primary-100">
              {mealDetails.strArea}
            </Badge>
            <Badge className="bg-my-secondary-700 dark:bg-my-secondary-700 dark:text-my-primary-100">
              {mealDetails.strCategory}
            </Badge>
          </div>

          <div className="lg:hidden">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="ingredients">
                <AccordionTrigger>
                  <h2 className="text-lg font-medium text-my-neutral-800 dark:text-my-neutral-100">
                    {t('Ingredients')}
                  </h2>
                </AccordionTrigger>
                <AccordionContent>
                  {renderIngredientsSection(mealDetails)}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="instructions">
                <AccordionTrigger>
                  <h2 className="text-lg font-medium text-my-neutral-800 dark:text-my-neutral-100">
                    {t('Instructions')}
                  </h2>
                </AccordionTrigger>
                <AccordionContent>
                  {renderInstructionsSection(mealDetails)}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="hidden grid-cols-12 grid-rows-1 gap-4 lg:grid">
            <div className="col-span-3">
              <h2 className="text-lg font-medium text-my-neutral-800 dark:text-my-neutral-100">
                {t('Ingredients')}
              </h2>
              <div>{renderIngredientsSection(mealDetails)}</div>
            </div>
            <div className="col-span-9">
              <h2 className="text-lg font-medium text-my-neutral-800 dark:text-my-neutral-100">
                {t('Instructions')}
              </h2>
              {renderInstructionsSection(mealDetails)}
            </div>
          </div>
        </>
      )}
    </ContentLayout>
  );
}
