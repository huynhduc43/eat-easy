import Image from 'next/image';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-[#eee]">
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav></nav>
      <div className="flex">
        <div className="flex-1 basis-[30px]">{children}</div>
        <div className="h-screen flex-grow basis-0 p-[30px]">
          <div className="flex h-full flex-col justify-between rounded-3xl bg-my-neutral-0 px-10 py-[30px]">
            <div className="relative flex h-[580px] items-center justify-center bg-white">
              <div className="absolute h-[230px] w-[230px] rounded-full bg-my-tertiary-200"></div>
              <div className="absolute h-[410px] w-[410px] rounded-full border border-orange-200"></div>
              <div className="absolute h-[580px] w-[580px] rounded-full border border-orange-200"></div>
              <div className="relative flex items-center justify-center">
                <Image
                  src="/phone-desktop.png"
                  alt="phone-desktop"
                  width={202}
                  height={298}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4">
              <div className="text-[1.9rem] leading-10 text-my-neutral-700">
                Full contactless experience
              </div>
              <div className="text-my-neutral-500">
                From ordering to paying, that’s all contactless
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
