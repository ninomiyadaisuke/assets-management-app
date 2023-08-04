import { FC, Suspense } from "react";

import { Spinner } from "@/app/_components/atoms/Spinner";
import { TotalHoldingCount } from "@/app/_components/atoms/TotalHoldingCount";
import { JaStockAccordion } from "@/app/_components/templates/JaStocks/JaStockAccordion";
import { JaStockListWrapper } from "@/app/_components/templates/JaStocks/JaStockListWrapper";
import { JaStocksPriceCard } from "@/app/_components/templates/JaStocks/JaStocksPriceCard";

export const JaStocks: FC = async () => {
  return (
    <>
      <div className="flex h-[100px] w-full items-center justify-center bg-primary" />
      <section className="m-auto mb-8 mt-[-64px] w-[90%]">
        <Suspense fallback={<Spinner />}>
          <JaStocksPriceCard />
        </Suspense>
      </section>
      <section className="flex h-20 items-center justify-between bg-gray-300 px-[5%]">
        <TotalHoldingCount />
      </section>
      <section className="m-auto mt-[-20px] flex w-[90%] flex-col gap-2">
        <Suspense fallback={<Spinner />}>
          <JaStockListWrapper
            children={(item, array) => {
              return (
                <JaStockAccordion
                  key={item.stockId}
                  item={item}
                  accordionInfo={array}
                />
              );
            }}
          />
        </Suspense>
      </section>
    </>
  );
};
