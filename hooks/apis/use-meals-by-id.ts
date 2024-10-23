import useSWR from 'swr';

import { TMeal } from '@/app/[locale]/(main)/recipes/types';
import { fetcher } from '@/app/lib/fetcher';
import { apiConfig } from '@/config';

export const useMealsById = (mealId: string) => {
  const {
    data,
    isLoading: isLoadingMeals,
    error: mealsError,
  } = useSWR<{ meals: TMeal[] }>(
    `${apiConfig.baseUrl}/${apiConfig.version}/${apiConfig.apiKey}/lookup.php?i=${mealId}`,
    fetcher,
    {
      errorRetryCount: 3,
    }
  );

  return {
    mealsError,
    isLoadingMeals,
    meals: data?.meals,
  };
};
