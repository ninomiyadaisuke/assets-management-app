import { FC, Suspense } from "react";

import { Spinner } from "@/app/_components/atoms/Spinner";
import { Tabs } from "@/app/_components/molecules/Tabs";
import { TotalPriceByType } from "@/app/_components/molecules/TotalPriceByType";

import { JaAndFgnDoughnutChart } from "./JaAndFgnDoughnutChart";
import { ListWrapper } from "./ListWrapper";

const data = ["評価額", "配当額"];

type Props = {
  status: "評価額" | "配当額" | "景気敏感割合";
};

export const JaAndFgnGraph: FC<Props> = ({ status }) => {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Tabs options={["評価額", "配当額"]} />
        <JaAndFgnDoughnutChart status={status} />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <ListWrapper
          status={status}
          children={(item) => (
            <TotalPriceByType
              title={item.title}
              price={item.price}
              color={item.color}
            />
          )}
        />
      </Suspense>
    </>
  );
};
