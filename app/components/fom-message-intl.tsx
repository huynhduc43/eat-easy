'use client';

import * as React from 'react';

import { useTranslations } from 'next-intl';

import { useFormField } from '@/app/components/common';
import { cn } from '@/app/lib/utils';
import { TranslationKeys } from '@/i18n/locales';

export const FormMessageIntl = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const t = useTranslations();
  const body = error ? t(error?.message as TranslationKeys) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('px-4 text-[0.8rem] font-medium text-red-500', className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessageIntl.displayName = 'FormMessageIntl';
