import { getTranslations } from 'next-intl/server';

import nocodb, { USERS_TABLE_ID } from '@/app/lib/actions/nocodb';
import {
  GetUsersResponse,
  GetUserByEmailResponse,
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
    // TODO: Handle logging
    console.log('🚀 ~ checkUserExists error:', error);

    return {
      success: false,
      error: t('error.something_went_wrong'),
    };
  }
}

export async function getUserByEmail(
  email: string
): Promise<GetUserByEmailResponse> {
  const t = await getTranslations('Common');

  try {
    const res = await nocodb.get<GetUsersResponse>(
      `/tables/${USERS_TABLE_ID}/records?where=(email,eq,${email})`
    );

    if (res.data.list.length > 0) {
      return {
        success: true,
        data: res.data.list[0],
      };
    }

    return {
      success: true,
      data: null,
    };
  } catch (error) {
    // TODO: Handle logging
    console.log('🚀 ~ getUserByEmail error:', error);

    return {
      success: false,
      error: t('error.something_went_wrong'),
    };
  }
}

export async function getUserById(id: string): Promise<GetUserByEmailResponse> {
  const t = await getTranslations('Common');

  try {
    const res = await nocodb.get<GetUsersResponse>(
      `/tables/${USERS_TABLE_ID}/records?where=(Id,eq,${id})`
    );

    if (res.data.list.length > 0) {
      return {
        success: true,
        data: res.data.list[0],
      };
    }

    return {
      success: true,
      data: null,
    };
  } catch (error) {
    // TODO: Handle logging
    console.log('🚀 ~ getUserById error:', error);

    return {
      success: false,
      error: t('error.something_went_wrong'),
    };
  }
}
