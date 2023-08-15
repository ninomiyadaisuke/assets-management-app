"use client";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { FC, useId } from "react";

import { CardWrapper } from "@/app/_components/atoms/CardWrapper";
import { StockBasicInfo } from "@/app/_components/atoms/StockBasicInfo";
import { StockInfo } from "@/app/_components/atoms/StockInfo";
import { BasicInfo } from "@/services/server/jaStockList";

const fetchData = [
  {
    title: "保有数了",
    unit: "株",
  },
  {
    title: "評価損益率",
    unit: "%",
  },
  {
    title: "平均取得単価",
    unit: "円",
  },
  {
    title: "配当金",
    unit: "円",
  },
];

type Props = {
  item: BasicInfo;
  accordionInfo: number[];
};

export const JaStockAccordion: FC<Props> = ({ item, accordionInfo }) => {
  const id = useId();
  return (
    <Accordion.Root type="multiple" asChild>
      <CardWrapper>
        <Accordion.Item value={`item-${id}`} asChild>
          <StockBasicInfo
            unit="円"
            id={item.stockId}
            stockCode={item.stockCode}
            stockName={item.stockName}
            evaluationAmount={item.evaluationAmount}
            profitLossAmount={item.profitLossAmount}
          />
        </Accordion.Item>
        <Accordion.Item value={`item-${id}`}>
          <Accordion.Content asChild>
            <table className="flex w-full px-3 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
              <tbody className="w-full">
                {fetchData.map((data, i) => (
                  <StockInfo
                    key={data.title}
                    title={data.title}
                    value={accordionInfo[i]}
                    unit={data.unit as "円" | "%" | "株" | "＄"}
                  />
                ))}
              </tbody>
            </table>
          </Accordion.Content>
          <Accordion.Trigger className="group flex h-8 w-full items-center justify-center border-t border-gray-300">
            <ChevronDownIcon
              className="transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
              aria-hidden
            />
          </Accordion.Trigger>
        </Accordion.Item>
      </CardWrapper>
    </Accordion.Root>
  );
};
