'use client';

import type { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import {
  Form,
  Input,
  Button,
  FormItem,
  FormField,
  FormControl,
} from '@/app/components/common';
import { FormMessageIntl } from '@/app/components';

import { SignUpSchema } from './sign-up-schema';

export default function SignUp() {
  const t = useTranslations('SignUp');
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignUp = form.handleSubmit(async (data) => {
    await fetch(`/api/sign-up`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    form.reset();
  });

  return (
    <div className="grid h-[calc(100vh_-_80px)] place-items-center">
      <div className="w-[480px]">
        <div className="mb-10 text-center">
          <h1 className="text-4xl text-my-neutral-800 dark:text-my-neutral-100">
            {t('getting_started')}
          </h1>
          <p className="mt-4 text-my-neutral-600 dark:text-my-neutral-200">
            {t('description')}
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={handleSignUp}>
            <FormField
              control={form.control}
              name="email"
              render={({ field, formState: { errors } }) => (
                <FormItem className="mb-6">
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      variant={!!errors.email && 'error'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessageIntl />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field, formState: { errors } }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t('password')}
                      autoComplete="current-password"
                      variant={!!errors.password && 'error'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessageIntl />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="mt-20 h-[54px] w-full"
            >
              {t('sign_up')}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
