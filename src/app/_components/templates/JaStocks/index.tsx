import { FC } from "react";

import { TotalHoldingCount } from "@/app/_components/atoms/TotalHoldingCount";
import { JaStockAccordion } from "@/app/_components/templates/JaStocks/JaStockAccordion";
import { JaStocksPriceCard } from "@/app/_components/templates/JaStocks/JaStocksPriceCard";

const data = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

export const JaStocks: FC = async () => {
  return (
    <>
      <div className="flex h-[100px] w-full items-center justify-center bg-primary"></div>
      <section className="m-auto mb-8 mt-[-64px] w-[90%]">
        <JaStocksPriceCard />
      </section>
      <section className="flex h-20 items-center justify-between bg-gray-300 px-[5%]">
        <TotalHoldingCount />
      </section>
      <section className="m-auto mb-20  mt-[-20px] flex w-[90%] flex-col gap-2">
        {data.map((data, i) => (
          <JaStockAccordion key={i} />
        ))}
      </section>
    </>
  );
};