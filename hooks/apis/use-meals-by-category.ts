import useSWR from 'swr';

import { TMeal } from '@/app/[locale]/(main)/recipes/types';
import { fetcher } from '@/app/lib/fetcher';

export const useMealsByCategory = (category: string) => {
  const {
    data,
    isLoading: isLoadingMeals,
    error: mealsError,
  } = useSWR<{ meals: TMeal[] }>(
    `http://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
    fetcher,
    {
      errorRetryCount: 3,
    }
  );

  return {
    mealsError,
    isLoadingMeals,
    meals: data?.meals ?? [],
  };
};
