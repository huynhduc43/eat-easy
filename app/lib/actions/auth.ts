'use server';

import { SignUpSchema } from '@/app/[locale]/(auth)/sign-up/sign-up-schema';

export async function signup(prevState: any, formData: FormData): Promise<any> {
  const validatedFields = SignUpSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
}
