'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function SlashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (!isLoading || pathname !== '/') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="absolute -left-48 -top-10 rounded-full border border-[#FFDFCF] border-opacity-20 md:-left-[448px] md:-top-40 md:border-2">
        <div className="m-0 rounded-full border-[#FFDFCF] border-opacity-0 md:m-12 md:border-2 md:border-opacity-20">
          <div className="m-6 rounded-full border border-[#FFDFCF] border-opacity-40 md:m-12 md:border-2">
            <div className="m-6 rounded-full border border-[#FFDFCF] border-opacity-60 md:m-12 md:border-2">
              <div className="m-6 rounded-full border border-[#FFDFCF] border-opacity-80 md:m-12 md:border-2">
                <div className="m-6 rounded-full border border-[#FFDFCF] p-4 md:m-12 md:border-2 md:p-9">
                  <Image
                    src="/images/foods/food-splash-1-mobile.png"
                    width={200}
                    height={200}
                    className="block md:hidden"
                    alt="Food splash 1"
                  />
                  <Image
                    src="/images/foods/food-splash-1-desktop.png"
                    width={390}
                    height={390}
                    className="hidden md:block"
                    alt="Food splash 1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="absolute bottom-11 left-10">
          <div className="flex flex-col text-6xl md:flex-row">
            <div className="font-medium text-my-neutral-700">Eat</div>
            <div className="font-bold text-[#FF7B2C]">Easy</div>
          </div>
          <div className="relative z-10 hidden w-[560px] pt-6 text-[18px] leading-8 text-my-neutral-600 md:block">
            Are you tired of scrolling through menus and struggling to decide
            what to order? Our new restaurant app has got you covered with
            personalized recommendations from our digital assistant.
          </div>
        </div>

        <div className="absolute -bottom-16 -right-52 rounded-full border border-[#FFDFCF] border-opacity-20 md:-bottom-52 md:-right-[444px] md:border-2">
          <div className="m-0 rounded-full border-[#FFDFCF] border-opacity-0 md:m-12 md:border-2 md:border-opacity-20">
            <div className="m-6 rounded-full border border-[#FFDFCF] border-opacity-40 md:m-12 md:border-2">
              <div className="m-6 rounded-full border border-[#FFDFCF] border-opacity-60 md:m-12 md:border-2">
                <div className="m-6 rounded-full border border-[#FFDFCF] border-opacity-80 md:m-12 md:border-2">
                  <div className="m-6 rounded-full border border-[#FFDFCF] p-4 md:m-12 md:border-2 md:p-9">
                    <Image
                      src="/images/foods/food-splash-2-mobile.png"
                      width={200}
                      height={200}
                      className="block md:hidden"
                      alt="Food splash 2"
                    />
                    <Image
                      src="/images/foods/food-splash-2-desktop.png"
                      width={390}
                      height={390}
                      className="hidden md:block"
                      alt="Food splash 2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
