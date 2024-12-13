'use server';

import bcrypt from 'bcrypt';
import { getTranslations } from 'next-intl/server';

import { SignUpSchema } from '@/app/[locale]/(auth)/sign-up/sign-up-schema';
import { checkUserExists } from '@/app/lib/actions/users/users';

import nocodb, { USERS_TABLE_ID } from '../nocodb';
import { CreateUserResponse } from './auth.types';

export async function signUp(
  prevState: any,
  formData: FormData
): Promise<CreateUserResponse> {
  const t = await getTranslations();

  const validatedFields = SignUpSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;
  const checkUserExistsRes = await checkUserExists(email);

  if (checkUserExistsRes.success && checkUserExistsRes.data.isExist) {
    return {
      success: false,
      error: t('SignUp.error.email_already_exists'),
    };
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const response = await nocodb.post<{ Id: number }>(
      `/tables/${USERS_TABLE_ID}/records`,
      {
        email,
        password: hashedPassword,
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.log('🚀 ~ error:', error);

    return {
      success: false,
      error: t('Common.error.something_went_wrong'),
    };
  }
}
