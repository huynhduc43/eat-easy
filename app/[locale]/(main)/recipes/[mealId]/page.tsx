'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { ContentLayout } from '@/app/components';
import { useMealsById } from '@/hooks/apis';
import { TMeal } from '@/app/[locale]/(main)/recipes/types';
import { Badge } from '@/app/components/common';
import { getYouTubeVideoId } from '@/app/lib/get-youtube-video-id';

import { TMealDetailsProps } from './types';

export default function MealDetails({ params }: TMealDetailsProps) {
  const t = useTranslations('MealDetails');

  const { meals } = useMealsById(params.mealId);
  const mealDetails = meals?.[0];

  return (
    <ContentLayout title={t('title')} className="mx-6 sm:mx-[42px]">
      {mealDetails && (
        <>
          <div>{JSON.stringify(meals)}</div>
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
          <h1 className="font-bold">{mealDetails.strMeal}</h1>
          <div className="flex gap-2">
            <Badge>{mealDetails.strArea}</Badge>
            <Badge>{mealDetails.strCategory}</Badge>
          </div>

          <div className="grid grid-cols-12 grid-rows-1 gap-4">
            <div className="col-span-3">
              <h2>{t('Ingredients')}</h2>
              <div>
                {Array(20)
                  .fill(0)
                  .map((v, index) =>
                    mealDetails[`strIngredient${index + 1}` as keyof TMeal] ? (
                      <div key={`strIngredient${index + 1}`}>
                        <div>
                          {}
                          {'- '}
                          {
                            mealDetails[`strMeasure${index + 1}` as keyof TMeal]
                          }{' '}
                          {mealDetails[
                            `strIngredient${index + 1}` as keyof TMeal
                          ].toLowerCase()}
                        </div>
                      </div>
                    ) : undefined
                  )}
              </div>
            </div>
            <div className="col-span-9">
              <h2>{t('Instructions')}</h2>
              {mealDetails.strYoutube && (
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(mealDetails.strYoutube)}`}
                  allowFullScreen
                  className="aspect-video w-full rounded-xl"
                />
              )}
              <div>{mealDetails.strInstructions}</div>
            </div>
          </div>
        </>
      )}
    </ContentLayout>
  );
}
