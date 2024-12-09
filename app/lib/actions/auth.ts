'use server';

import { SignUpSchema } from '@/app/[locale]/(auth)/sign-up/sign-up-schema';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function signup(prevState: any, formData: FormData): Promise<any> {
  await delay(3000);
  const validatedFields = SignUpSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  console.log('🚀 ~ signup ~ validatedFields:', validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
}
