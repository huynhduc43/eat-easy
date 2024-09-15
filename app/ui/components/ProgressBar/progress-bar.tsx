import clsx from 'clsx';

import { TProgressBarOptions } from './types';

export default function ProgreessBar(options: TProgressBarOptions) {
  const { totalStep = 4, currentStep = 1 } = options;
  // const t = `left-${(currentStep - 1) * 8}`;
  // const t = `w-${totalStep * 8} h rounded-2xl bg-slate-100`;
  return (
    <div
      // className={clsx('h rounded-2xl bg-slate-100', {
      //   'w-32': totalStep === 4,
      // })}
      className={`w-${totalStep * 8} rounded-2xl bg-slate-100`}
    >
      <div
        // className={clsx('relative h-2 w-8 rounded-2xl bg-my-secondary-600', {
        //   'left-8': currentStep === 2,
        //   'left-16': currentStep === 3,
        //   'left-24': currentStep === 4,
        // })}
        className={`left-${(currentStep - 1) * 8} relative h-2 w-8 rounded-2xl bg-my-secondary-600`}
      ></div>
    </div>
  );
}
