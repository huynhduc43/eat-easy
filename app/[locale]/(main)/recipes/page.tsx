import { ContentLayout } from '@/app/components';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export default async function Recipes({ locale }: any) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('Recipes');
  let res = await fetch(
    'https://www.themealdb.com/api/json/v1/1/categories.php',
    {
      method: 'GET',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  let categories = await res.json();
  console.log('🚀 ~ Home ~ randomMeals:', categories);

  return <ContentLayout title={t('title')}>{t('title')}</ContentLayout>;
}
