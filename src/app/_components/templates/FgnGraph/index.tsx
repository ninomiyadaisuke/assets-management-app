import { FC, Suspense } from "react";

import { RadioBoxGroup } from "@/app/_components/molecules/RadioBoxGroup";

import { Spinner } from "../../atoms/Spinner";
import { ExchangeRateWithSwitch } from "../../molecules/ExchangeRateWithSwitch";
import { FgnDoughnutChart } from "./FgnDoughnutChart";
import { ListWrapper } from "./ListWrapper";

const data = ["評価額", "配当額", "景気敏感割合"];

type Props = {
  status: "評価額" | "配当額" | "景気敏感割合";
};

export const FgnGraph: FC<Props> = ({ status }) => {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <FgnDoughnutChart status={status} />
      </Suspense>
      <RadioBoxGroup options={data} status={status} />
      <Suspense fallback={<Spinner />}>
        <ExchangeRateWithSwitch />
      </Suspense>
      <ListWrapper />
    </div>
  );
};
