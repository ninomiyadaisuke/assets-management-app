"use client";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { FC, useId } from "react";

import { CardWrapper } from "@/app/_components/atoms/CardWrapper";
import { StockBasicInfo } from "@/app/_components/atoms/StockBasicInfo";
import { StockInfo } from "@/app/_components/atoms/StockInfo";

const fetchData = [
  {
    title: "現在価格",
    value: 40000,
    unit: "円",
  },
  {
    title: "保有数了",
    value: 100,
    unit: "株",
  },
  {
    title: "評価損益率",
    value: 30,
    unit: "%",
  },
  {
    title: "平均取得単価",
    value: 40000,
    unit: "円",
  },
  {
    title: "配当金",
    value: 100,
    unit: "円",
  },
];

export const JaStockAccordion: FC = () => {
  const id = useId();
  return (
    <Accordion.Root type="multiple" asChild>
      <CardWrapper>
        <Accordion.Item value={`item-${id}`} asChild>
          <StockBasicInfo
            id="testid"
            stockCode="1301"
            stockName="極洋"
            evaluationAmount={3000}
            profitLossAmount={1000}
          />
        </Accordion.Item>
        <Accordion.Item value={`item-${id}`}>
          <Accordion.Content className="px-3 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
            {fetchData.map((data) => (
              <StockInfo
                key={data.title}
                className=""
                title={data.title}
                value={data.value}
                unit={data.unit as "円" | "%" | "株" | "＄"}
              />
            ))}
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
