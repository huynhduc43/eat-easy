import Image from 'next/image';

import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { TCategory, TMeal } from '@/app/[locale]/(main)/recipes/types';
import { ContentLayout } from '@/app/components';
import {
  Badge,
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/app/components/common';
import { getYouTubeVideoId } from '@/app/lib/get-youtube-video-id';
import { cn } from '@/app/lib/utils';
import { apiConfig } from '@/config';
import { TMealsByCategoryRes, TMealsRes } from '@/hooks/apis';
import { locales } from '@/i18n/locales';

import { TMealDetailsProps } from './types';

export async function generateStaticParams() {
  const categories: {
    categories: TCategory[];
  } = await fetch(
    `${apiConfig.baseUrl}/${apiConfig.version}/${apiConfig.apiKey}/categories.php`
  ).then((res) => res.json());

  const promises = [categories.categories[0]].map(async (category) => {
    const res: TMealsByCategoryRes = await fetch(
      `${apiConfig.baseUrl}/${apiConfig.version}/${apiConfig.apiKey}/filter.php?c=${category.strCategory}`
    ).then((res) => res.json());

    return res.meals.map((meal) => meal.idMeal);
  });

  const mealsPerCategory = await Promise.all(promises);
  const allMeals = mealsPerCategory.flat();

  return locales.flatMap((locale) =>
    allMeals.map((mealId) => ({ locale, mealId: mealId }))
  );
}

export default async function MealDetails({ params }: TMealDetailsProps) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations('MealDetails');

  const res: TMealsRes = await fetch(
    `${apiConfig.baseUrl}/${apiConfig.version}/${apiConfig.apiKey}/lookup.php?i=${params.mealId}`,
    { next: { revalidate: 60 * 60 } }
  ).then((res) => res.json());

  const mealDetails = res.meals?.[0];

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
