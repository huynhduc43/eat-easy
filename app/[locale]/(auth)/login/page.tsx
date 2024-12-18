'use client';

import { useEffect, MouseEvent } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { SignUpSchema } from '@/app/[locale]/(auth)/sign-up/sign-up-schema';
import { FormMessageIntl, SubmitButton } from '@/app/components';
import {
  Form,
  Input,
  FormItem,
  FormField,
  FormControl,
} from '@/app/components/common';
import useAuthStore from '@/app/hooks/use-auth';
import { login } from '@/app/lib/actions/auth';
import { ERROR_TOAST_DURATION_MS } from '@/common/constants';
import { toast } from '@/hooks/use-toast';
import { Link, useRouter } from '@/i18n/routing';

export default function LoginPage() {
  const t = useTranslations('Login');
  const router = useRouter();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [state, formAction] = useFormState(login, null);
  const { setAccessToken } = useAuthStore();

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

    setAccessToken(state.data.accessToken);
    router.push('/home');
  }, [state, router, t, setAccessToken]);

  return (
    <div className="grid h-[calc(100vh_-_80px)] place-items-center">
      <div className="w-full sm:w-[480px] px-4 sm:px-0">
        <div className="mb-4 text-center">
          <h1 className="text-4xl text-my-neutral-800 dark:text-my-neutral-100">
            {t('welcome_back')}
          </h1>
          <p className="mt-4 text-my-neutral-600 dark:text-my-neutral-200">
            {t('description')}
          </p>
        </div>
        <div className="flex justify-center mb-10">
          <span>{t('dont_have_an_account')}&nbsp;</span>
          <Link
            href="/sign-up"
            className="text-my-primary-600 font-bold dark:text-my-secondary-800"
          >
            {t('sign_up_now')}
          </Link>
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
                      placeholder={t('form.placeholder.email')}
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
                      placeholder={t('form.placeholder.password')}
                      autoComplete="current-password"
                      variant={!!errors.password && 'error'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessageIntl />
                </FormItem>
              )}
            />
            <SubmitButton title={t('login')} onClick={handleSubmit} />
          </form>
        </Form>
      </div>
    </div>
  );
}
