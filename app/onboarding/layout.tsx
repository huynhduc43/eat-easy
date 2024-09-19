import Image from 'next/image';

import { Progress } from '@/app/components';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-[#eee]">
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav></nav>
      <div className="flex h-screen">
        <div className="flex-1">{children}</div>
        <div className="box-content h-screen flex-1">
          <div className="h-web m-[30px] flex h-webkit-fill flex-col justify-between overflow-hidden rounded-3xl bg-my-neutral-0 px-10 py-[30px]">
            <div className="relative my-[52px] flex h-[580px] items-center justify-center bg-white">
              <div className="absolute rounded-full border border-orange-200 md:h-[290px] md:w-[290px] lg:h-[390px] lg:w-[390px] xl:h-[580px] xl:w-[580px]"></div>
              <div className="absolute rounded-full border border-orange-200 md:h-56 md:w-56 lg:h-[304px] lg:w-[304px] xl:h-[410px] xl:w-[410px]"></div>
              <div className="absolute rounded-full bg-my-tertiary-200 md:h-40 md:w-40 lg:h-[230px] lg:w-[230px]"></div>
              <div className="relative flex items-center justify-center">
                <Image
                  src="/phone-desktop.png"
                  alt="phone-desktop"
                  width={202}
                  height={298}
                  className="md:w-32 lg:w-44 xl:w-[202px]"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-4">
              <div className="flex justify-center"></div>
              <Progress className="w-[120px]" value={25} />
              <div>
                <div className="mb-[14px] text-center text-[1.9rem] leading-10 text-my-neutral-700">
                  Full contactless experience
                </div>
                <div className="text-center text-my-neutral-500">
                  From ordering to paying, that’s all contactless
                </div>
              </div>
              <div className="text-[1.7rem] leading-10">
                <span className="text-my-neutral-700">Eat</span>
                <span className="font-bold text-my-tertiary-700">Easy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
