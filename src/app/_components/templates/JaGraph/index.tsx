import { FC, Suspense } from "react";

import { Spinner } from "@/app/_components/atoms/Spinner";
import { Tabs } from "@/app/_components/molecules/Tabs";
import { TotalPriceByType } from "@/app/_components/molecules/TotalPriceByType";
import { fetchDividendYieldClient } from "@/services/client/dividendYieldFetch";
import { serverComponentAuthValidateAndReturnUid } from "@/services/server/auth";

import { JaDoughnutChart } from "./JaDoughnutChart";
import { ListWrapper } from "./ListWrapper";

type Props = {
  status: "評価額" | "配当額" | "景気敏感割合";
};
export const JaGraph: FC<Props> = async ({ status }) => {
  const uid = await serverComponentAuthValidateAndReturnUid();
  const data = await fetchDividendYieldClient(uid, status, "yen");

  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <Tabs options={["評価額", "配当額", "景気敏感割合"]} />
        <JaDoughnutChart status={status} />
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
    </div>
  );
};
