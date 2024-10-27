import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

import { ContentLayout } from '@/app/components';
import { apiConfig } from '@/config';
import { TMeal } from '@/app/[locale]/(main)/recipes/types';

async function getRandomMeals(): Promise<{ meals: TMeal[] }> {
  const res = await fetch(
    `${apiConfig.baseUrl}/${apiConfig.version}/${apiConfig.apiKey}/random.php`,
    { next: { revalidate: 24 * 60 * 60 } }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch random meal');
  }

  return res.json();
}

export default async function Home() {
  const data = await getRandomMeals();
  const mealDetails = data.meals[0];
  const t = await getTranslations('HomePage');

  return (
    <ContentLayout title={t('title')} className="mx-6 sm:mx-[42px]">
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:grid-rows-1">
        <div className="relative top-[132px] z-10 lg:col-span-6 xl:top-40">
          <h2 className="text-3xl font-bold text-my-secondary-700">
            {t('Todays_Meal')}
          </h2>
          <p className="text-xl font-bold text-my-neutral-800 dark:text-my-neutral-0">
            {mealDetails.strMeal}
          </p>
          {/* Fake meal description */}
          <p className="line-clamp-6 text-my-neutral-600 dark:text-my-neutral-200">
            {mealDetails.strInstructions}
          </p>
        </div>
        {mealDetails && (
          <div className="lg:col-span-6">
            <div className="relative top-4 my-[52px] flex items-center justify-center lg:top-20">
              <div className="absolute size-72 rounded-full border border-orange-200 md:size-80 lg:size-[360px] xl:size-[480px]"></div>
              <div className="absolute size-56 rounded-full border border-orange-200 md:size-64 lg:size-[300px] xl:size-[416px]"></div>
              <div className="relative flex items-center justify-center">
                <Image
                  src={mealDetails.strMealThumb}
                  alt={mealDetails.strMeal}
                  width={160}
                  height={160}
                  className="rounded-full border-2 border-orange-200 md:size-48 lg:size-60 xl:size-[352px]"
                  priority
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </ContentLayout>
  );
}
