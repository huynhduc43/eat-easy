import { getTranslations } from 'next-intl/server';

import { ContentLayout } from '@/app/components';
import { apiConfig } from '@/config';
import { TMeal } from '@/app/[locale]/(main)/recipes/types';

async function getRandomMeals(): Promise<{ meals: TMeal[] }> {
  const res = await fetch(
    `${apiConfig.baseUrl}/${apiConfig.version}/${apiConfig.apiKey}/random.php`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch random meal');
  }

  return res.json();
}

export default async function Home() {
  const data = await getRandomMeals();
  const t = await getTranslations('HomePage');

  return (
    <ContentLayout title={t('title')} className="mx-6 sm:mx-[42px]">
      <div>{t('Todays_Meal')}</div>
      <div>{JSON.stringify(data.meals[0])}</div>
    </ContentLayout>
  );
}
