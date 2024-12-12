'use server';

import bcrypt from 'bcrypt';
import { AxiosError } from 'axios';

import { SignUpSchema } from '@/app/[locale]/(auth)/sign-up/sign-up-schema';
import nocodb, { USERS_TABLE_ID } from '@/app/lib/actions/nocodb';
import { CreateUserResponse } from '@/app/lib/actions/auth/auth.types';

export async function signUp(
  prevState: any,
  formData: FormData
): Promise<CreateUserResponse> {
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
    const errorMessage =
      (error as AxiosError).response?.data ||
      'An error occurred during sign up.';

    return {
      success: false,
      error: errorMessage as string,
    };
  }
}
