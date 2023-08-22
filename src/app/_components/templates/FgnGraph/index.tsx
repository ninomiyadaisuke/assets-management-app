import { FC } from "react";

import { RadioBoxGroup } from "@/app/_components/molecules/RadioBoxGroup";

import { FgnDoughnutChart } from "./FgnDoughnutChart";
import { ListWrapper } from "./ListWrapper";

const data = ["評価額", "配当額", "景気敏感割合"];

type Props = {
  status: "評価額" | "配当額" | "景気敏感割合";
};

export const FgnGraph: FC<Props> = ({ status }) => {
  return (
    <div>
      <FgnDoughnutChart />
      <RadioBoxGroup options={data} status={status} />
      <ListWrapper />
    </div>
  );
};
