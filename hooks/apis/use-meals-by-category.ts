import useSWR from 'swr';

import { TMeal } from '@/app/[locale]/(main)/recipes/types';
import { fetcher } from '@/app/lib/fetcher';
import { apiConfig } from '@/config';

export type TMealsByCategoryRes = {
  meals: TMeal[];
};

export const useMealsByCategory = (category: string) => {
  const {
    data,
    isLoading: isLoadingMeals,
    error: mealsError,
  } = useSWR<TMealsByCategoryRes>(
    `${apiConfig.baseUrl}/${apiConfig.version}/${apiConfig.apiKey}/filter.php?c=${category}`,
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
