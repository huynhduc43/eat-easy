import { getTranslations } from 'next-intl/server';

import nocodb, { USERS_TABLE_ID } from '@/app/lib/actions/nocodb';
import {
  GetUsersResponse,
  CheckUserExistsResponse,
} from '@/app/lib/actions/users/users.types';

export async function checkUserExists(
  email: string
): Promise<CheckUserExistsResponse> {
  const t = await getTranslations('Common');

  try {
    const res = await nocodb.get<GetUsersResponse>(
      `/tables/${USERS_TABLE_ID}/records?where=(email,eq,${email})`
    );

    if (res.data.list.length > 0) {
      return {
        success: true,
        data: { isExist: true },
      };
    }

    return {
      success: true,
      data: { isExist: false },
    };
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return {
      success: false,
      error: t('error.something_went_wrong'),
    };
  }
}
