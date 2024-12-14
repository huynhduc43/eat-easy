'use client';

import { useEffect, MouseEvent } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { FormMessageIntl, SubmitButton } from '@/app/components';
import {
  Form,
  Input,
  FormItem,
  FormField,
  FormControl,
} from '@/app/components/common';
import { signUp } from '@/app/lib/actions/auth';
import {
  REDIRECT_DURATION_MS,
  ERROR_TOAST_DURATION_MS,
  SUCCESS_TOAST_DURATION_MS,
} from '@/common/constants';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from '@/i18n/routing';

import { SignUpSchema } from './sign-up-schema';

export default function SignUp() {
  const t = useTranslations('SignUp');
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [state, formAction] = useFormState(signUp, null);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    const valid = await form.trigger();

    if (!valid) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (state === null) {
      return;
    }

    if (!state?.success) {
      toast({
        duration: ERROR_TOAST_DURATION_MS,
        variant: 'destructive',
        title: state?.error,
      });
      return;
    }

    toast({
      duration: SUCCESS_TOAST_DURATION_MS,
      title: t('redirecting_to_login'),
      variant: 'success',
    });

    setTimeout(() => {
      router.push('/login');
    }, REDIRECT_DURATION_MS);
  }, [state, toast, router, t]);

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
                      variant={errors.email ? 'error' : undefined}
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
            <SubmitButton title={t('sign_up')} onClick={handleSubmit} />
          </form>
        </Form>
      </div>
    </div>
  );
}
