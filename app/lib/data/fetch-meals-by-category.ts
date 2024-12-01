import { TMeal } from '@/app/[locale]/(main)/recipes/types';
import { apiConfig } from '@/config';

export type TMealsByCategoryRes = {
  meals: TMeal[];
};

export async function fetchMealsByCategory(category: string) {
  const response: TMealsByCategoryRes = await fetch(
    `${apiConfig.baseUrl}/${apiConfig.version}/${apiConfig.apiKey}/filter.php?c=${category}`
  ).then((res) => res.json());

  return response?.meals ?? [];
}
