import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { ContentLayout } from '@/app/components';
import { RecipesSection } from '@/app/[locale]/(main)/recipes/components';
import { fetchCategories, fetchMealsByCategory } from '@/app/lib/data';
import { TMeal } from '@/app/[locale]/(main)/recipes/types';

export default async function Recipes({
  params,
}: {
  params: { locale: string };
}) {
  const categories = await fetchCategories();
  const meals = await Promise.all(
    categories.map(
      async (category) => await fetchMealsByCategory(category.strCategory)
    )
  );

  const mealsByCategory = categories.reduce(
    (obj, category, index) => {
      obj[category.strCategory] = meals[index];
      return obj;
    },
    {} as Record<string, TMeal[]>
  );

  unstable_setRequestLocale(params.locale);
  const t = await getTranslations('Recipes');

  return (
    <ContentLayout title={t('title')}>
      <RecipesSection
        categories={categories}
        mealsByCategory={mealsByCategory}
      />
    </ContentLayout>
  );
}
