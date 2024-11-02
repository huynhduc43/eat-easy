'use client';

import type { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, Input } from '@/app/components/common';

import { signUpSchema } from './sign-up-schema';

export default function SignUp() {
  const { handleSubmit, register, reset, formState } = useForm<
    z.infer<typeof signUpSchema>
  >({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  console.log('🚀 ~ SignUp ~ formState:', formState.errors);

  const handleSignUp = handleSubmit(async (data) => {
    console.log('🚀 ~ handleSignUp ~ data:', data);
    await fetch(`/api/counter`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    reset();
  });

  return (
    <div className="grid h-[calc(100vh_-_80px)] place-items-center">
      <div className="w-[480px]">
        <div className="mb-10 text-center">
          <h1 className="text-4xl text-my-neutral-800 dark:text-my-neutral-100">
            Getting started! ✌️
          </h1>
          <p className="mt-4 text-my-neutral-600 dark:text-my-neutral-200">
            Look like you are new to us! Create an account for a complete
            experience.
          </p>
        </div>
        <form onSubmit={handleSignUp}>
          <Input
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...register('email')}
            className="mb-6"
          />
          <Input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            {...register('password')}
          />
          <Button
            type="submit"
            disabled={formState.isSubmitting}
            className="mt-20 w-full"
          >
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
}
