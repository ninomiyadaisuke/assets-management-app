import { FC, Suspense } from "react";

import { Spinner } from "@/app/_components/atoms/Spinner";
import { TotalHoldingCount } from "@/app/_components/atoms/TotalHoldingCount";
import { JaStockAccordion } from "@/app/_components/templates/JaStocks/JaStockAccordion";
import { JaStockListWrapper } from "@/app/_components/templates/JaStocks/JaStockListWrapper";
import { JaStocksPriceCard } from "@/app/_components/templates/JaStocks/JaStocksPriceCard";

import { SocketProvider } from "../../Provider";

export const JaStocks: FC = async () => {
  return (
    <>
      <SocketProvider>
        <Suspense fallback={<Spinner />}>
          <div className="flex h-[100px] w-full items-center justify-center bg-primary" />
          <section className="m-auto mb-8 mt-[-64px] w-[90%]">
            <JaStocksPriceCard />
          </section>
        </Suspense>
      </SocketProvider>
      <Suspense fallback={<Spinner />}>
        <section className="flex h-20 items-center justify-between bg-gray-300 px-[5%]">
          <TotalHoldingCount marketType="日本株" />
        </section>
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <section className="m-auto mt-[-20px] flex w-[90%] flex-col gap-2">
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
        </section>
      </Suspense>
    </>
  );
};
