import Image from "next/image";

export default function SlashScreen() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="border md:border-2 rounded-full border-[#FFDFCF] border-opacity-20 absolute -left-48 -top-10 md:-left-[448px] md:-top-40">
        <div className="md:border-2 rounded-full m-0 md:m-12 border-[#FFDFCF] border-opacity-0 md:border-opacity-20">
          <div className="border md:border-2 rounded-full m-6 md:m-12 border-[#FFDFCF] border-opacity-40">
            <div className="border md:border-2 rounded-full m-6 md:m-12 border-[#FFDFCF] border-opacity-60">
              <div className="border md:border-2 rounded-full m-6 md:m-12 border-[#FFDFCF] border-opacity-80">
                <div className="border md:border-2 rounded-full m-6 md:m-12 p-4 md:p-9 border-[#FFDFCF]">
                  <Image
                    src="/foods/food-splash-1-mobile.png"
                    width={200}
                    height={200}
                    className="block md:hidden"
                    alt="Food splash 1"
                  />
                  <Image
                    src="/foods/food-splash-1-desktop.png"
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
        <div className="absolute bottom-11 left-10 ">
          <div className="flex flex-col text-6xl md:flex-row">
            <div className="text-my-neutral-700 font-medium">Eat</div>
            <div className="text-[#FF7B2C] font-bold">Easy</div>
          </div>
          <div className="text-[18px] w-[560px] leading-8 pt-6 hidden md:block relative z-10 text-my-neutral-600">
            Are you tired of scrolling through menus and struggling to decide
            what to order? Our new restaurant app has got you covered with
            personalized recommendations from our digital assistant.
          </div>
        </div>

        <div className="border md:border-2 rounded-full border-[#FFDFCF] border-opacity-20 absolute -bottom-16 -right-52 md:-bottom-52 md:-right-[444px]">
          <div className="md:border-2 rounded-full m-0 md:m-12 border-[#FFDFCF] border-opacity-0 md:border-opacity-20">
            <div className="border md:border-2 rounded-full m-6 md:m-12 border-[#FFDFCF] border-opacity-40">
              <div className="border md:border-2 rounded-full m-6 md:m-12 border-[#FFDFCF] border-opacity-60">
                <div className="border md:border-2 rounded-full m-6 md:m-12 border-[#FFDFCF] border-opacity-80">
                  <div className="border md:border-2 rounded-full m-6 md:m-12 p-4 md:p-9 border-[#FFDFCF]">
                    <Image
                      src="/foods/food-splash-2-mobile.png"
                      width={200}
                      height={200}
                      className="block md:hidden"
                      alt="Food splash 2"
                    />
                    <Image
                      src="/foods/food-splash-2-desktop.png"
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
