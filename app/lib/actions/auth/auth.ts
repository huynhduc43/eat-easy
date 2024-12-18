'use server';

import { cookies } from 'next/headers';

import bcrypt from 'bcryptjs';
import { getTranslations } from 'next-intl/server';

import { SignUpSchema } from '@/app/[locale]/(auth)/sign-up/sign-up-schema';
import { generateTokens } from '@/app/lib/actions/auth/jwt-service';
import { checkUserExists, getUserByEmail } from '@/app/lib/actions/users/users';
import { Role } from '@/common/enums';

import nocodb, { USERS_TABLE_ID } from '../nocodb';
import { CreateUserResponse, LoginResponse } from './auth.types';

export async function signUp(
  _prevState: CreateUserResponse | null,
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
        role: Role.USER,
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // TODO: Handle logging
    console.log('🚀 ~ signUp error:', error);

    return {
      success: false,
      error: t('Common.error.something_went_wrong'),
    };
  }
}

export async function login(
  _prevState: LoginResponse | null,
  formData: FormData
): Promise<LoginResponse> {
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
  const userResponse = await getUserByEmail(email);

  if (!userResponse.success) {
    return {
      success: false,
      error: t('Common.error.something_went_wrong'),
    };
  }

  if (!userResponse.data) {
    return {
      success: false,
      error: t('Login.error.invalid_credentials'),
    };
  }

  const isPasswordMatch = await bcrypt.compare(
    password,
    userResponse.data.password
  );

  if (!isPasswordMatch) {
    return {
      success: false,
      error: t('Login.error.invalid_credentials'),
    };
  }

  const tokens = await generateTokens(email, userResponse.data.role);

  return {
    success: true,
    data: tokens,
  };
}

export async function logout() {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
}
