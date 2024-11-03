import * as React from 'react';

import { cn } from '@/app/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'error' | false;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-[54px] w-full rounded-lg border border-input bg-my-neutral-0 px-4 py-[11px] text-sm text-my-neutral-700 !outline-offset-0 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-my-neutral-300 hover:border-my-neutral-600 hover:outline hover:outline-2 hover:outline-my-primary-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:border-my-neutral-150 disabled:bg-my-neutral-100 dark:bg-[#4A4A6A]/30 dark:text-my-neutral-0 dark:outline-my-primary-600 dark:hover:border-my-primary-100 dark:disabled:border-my-neutral-600/30 dark:disabled:bg-my-neutral-700/10 dark:disabled:placeholder:text-my-neutral-300/50',
          variant ? 'border-my-danger-500' : '',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
