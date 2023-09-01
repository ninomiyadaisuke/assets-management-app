import { FC, Suspense } from "react";

import { Spinner } from "@/app/_components/atoms/Spinner";
import { Tabs } from "@/app/_components/molecules/Tabs";
import { TotalPriceByType } from "@/app/_components/molecules/TotalPriceByType";
import { fetchDividendYieldClient } from "@/services/client/dividendYieldFetch";
import { serverComponentAuthValidateAndReturnUid } from "@/services/server/auth";

import { DisplayDividendYield } from "../../molecules/DisplayDividendYield";
import { JaAndFgnDoughnutChart } from "./JaAndFgnDoughnutChart";
import { ListWrapper } from "./ListWrapper";

type Props = {
  status: "評価額" | "配当額" | "景気敏感割合";
};

export const JaAndFgnGraph: FC<Props> = async ({ status }) => {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Tabs options={["評価額", "配当額"]} status={status} />
        <JaAndFgnDoughnutChart status={status} />
        <DisplayDividendYield status={status} currency="yenAndDollar" />
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
