import { TCategory } from '@/app/[locale]/(main)/recipes/types';
import { apiConfig } from '@/config';

const AllCategory: TCategory = {
  idCategory: 'all',
  strCategory: 'All',
  strCategoryThumb: '',
  strCategoryDescription: '',
};

export async function fetchCategories() {
  const response: {
    categories: TCategory[];
  } = await fetch(
    `${apiConfig.baseUrl}/${apiConfig.version}/${apiConfig.apiKey}/categories.php`
  ).then((res) => res.json());

  if (response?.categories?.[0].idCategory !== AllCategory.idCategory) {
    response?.categories?.unshift(AllCategory);
  }

  return response?.categories ?? [AllCategory];
}
