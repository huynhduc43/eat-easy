'use client';

import { useEffect, MouseEvent } from 'react';
import type { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import {
  Form,
  Input,
  FormItem,
  FormField,
  FormControl,
} from '@/app/components/common';
import { FormMessageIntl, SubmitButton } from '@/app/components';

import { SignUpSchema } from './sign-up-schema';
import { signup } from '@/app/lib/actions/auth';
import { useFormState } from 'react-dom';

export default function SignUp() {
  const t = useTranslations('SignUp');
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [state, formAction] = useFormState(signup, {
    email: '',
    password: '',
  });

  const handleClickSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    const valid = await form.trigger();

    if (!valid) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    console.log('state: ', state);
  }, [state]);

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
          <form action={formAction}>
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
            <SubmitButton title={t('sign_up')} onClick={handleClickSubmit} />
          </form>
        </Form>
      </div>
    </div>
  );
}
