import Image from "next/image";

export default function SlashScreen() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="border rounded-full absolute border-[#FFDFCF] border-opacity-40 -left-44 -top-3">
        <div className="border rounded-full m-6 border-[#FFDFCF] border-opacity-60">
          <div className="border rounded-full m-6 border-[#FFDFCF] border-opacity-80">
            <div className="border rounded-full m-6 p-4 border-[#FFDFCF]">
              <Image
                src="/foods/food-splash-1-mobile.png"
                width={200}
                height={200}
                className="block md:hidden"
                alt="Food splash 1"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="absolute bottom-11 left-10 flex-col text-6xl  ">
          <div className="text-[#4A4A6A]">Eat</div>
          <div className="text-[#FF7B2C]">Easy</div>
        </div>
        <div className="border rounded-full border-[#FFDFCF] border-opacity-40 absolute -bottom-12 -right-44">
          <div className="border rounded-full m-6 border-[#FFDFCF] border-opacity-60">
            <div className="border rounded-full m-6 border-[#FFDFCF] border-opacity-80">
              <div className="border rounded-full m-6 p-4 border-[#FFDFCF]">
                <Image
                  src="/foods/food-splash-2-mobile.png"
                  width={200}
                  height={200}
                  className="block md:hidden "
                  alt="Food splash 2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
