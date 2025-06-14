'use client';

import React from 'react';

import { useFormStatus } from 'react-dom';

import { Button } from '@/app/components/common';
import { cn } from '@/app/lib/utils';

type SubmitButtonProps = {
  title: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export function SubmitButton({ title, className, onClick }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      onClick={onClick}
      className={cn('mt-20 h-[54px] w-full', className)}
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          <span>{title}</span>
        </div>
      ) : (
        title
      )}
    </Button>
  );
}
