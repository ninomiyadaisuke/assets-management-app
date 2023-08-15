import { FC, Suspense } from "react";

import { Spinner } from "@/app/_components/atoms/Spinner";
import { TotalHoldingCount } from "@/app/_components/atoms/TotalHoldingCount";
import { ExchangeRateWithSwitch } from "@/app/_components/molecules/ExchangeRateWithSwitch";

import { FgnStockAccordion } from "./FgnStockAccordion";
import { FgnStockListWrapper } from "./FgnStockListWrapper";
import { FgnStocksPriceCard } from "./FgnStocksPriceCard";

type Props = {
  status: "dollar" | "yen";
};

export const FgnStocks: FC<Props> = async ({ status }) => {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <div className="flex h-[100px] w-full items-center justify-center bg-primary" />
        <section className="m-auto mb-8 mt-[-64px] w-[90%]">
          <FgnStocksPriceCard status={status} />
        </section>
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <section className="flex h-20 items-center justify-between bg-gray-300 px-[5%]">
          {/* <TotalHoldingCount country="foreign" /> */}
          <ExchangeRateWithSwitch />
        </section>
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <section className="m-auto mt-[-20px] flex w-[90%] flex-col gap-2">
          <FgnStockListWrapper
            status={status}
            children={(item, array) => {
              return (
                <FgnStockAccordion
                  unit={status === "yen" ? "円" : "＄"}
                  key={item.stockId}
                  item={item}
                  accordionInfo={array}
                />
              );
            }}
          />
        </section>
      </Suspense>
    </>
  );
};
