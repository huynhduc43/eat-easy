import useSWR from 'swr';

import { TCategory } from '@/app/[locale]/(main)/recipes/types';
import { fetcher } from '@/app/lib/fetcher';

export const useCategories = () => {
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: isLoadingCategories,
  } = useSWR<{
    categories: TCategory[];
  }>('https://www.themealdb.com/api/json/v1/1/categories.php', fetcher, {
    errorRetryCount: 3,
  });

  return {
    categoriesError,
    isLoadingCategories,
    categories: categoriesData?.categories ?? [],
  };
};
