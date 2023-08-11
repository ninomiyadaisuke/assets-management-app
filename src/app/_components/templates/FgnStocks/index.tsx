import { FC, Suspense } from "react";

import { Spinner } from "@/app/_components/atoms/Spinner";
import { TotalHoldingCount } from "@/app/_components/atoms/TotalHoldingCount";
import { ExchangeRateWithSwitch } from "@/app/_components/molecules/ExchangeRateWithSwitch";

import { FgnStocksPriceCard } from "./FgnStocksPriceCard";

export const FgnStocks: FC = () => {
  return (
    <>
      <div className="flex h-[100px] w-full items-center justify-center bg-primary" />
      <section className="m-auto mb-8 mt-[-64px] w-[90%]">
        <FgnStocksPriceCard />
      </section>
      <Suspense fallback={<Spinner />}>
        <section className="flex h-20 items-center justify-between bg-gray-300 px-[5%]">
          {/* <TotalHoldingCount country="foreign" /> */}
          <ExchangeRateWithSwitch />
        </section>
      </Suspense>
      <section className="m-auto mt-[-20px] flex w-[90%] flex-col gap-2"></section>
    </>
  );
};
