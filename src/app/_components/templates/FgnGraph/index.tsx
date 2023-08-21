import { FC } from "react";

import { RadioBoxGroup } from "@/app/_components/molecules/RadioBoxGroup";

import { FgnDoughnutChart } from "./FgnDoughnutChart";
import { ListWrapper } from "./ListWrapper";

const data = ["評価額", "配当額", "景気敏感割合"];

export const FgnGraph: FC = () => {
  return (
    <div>
      <FgnDoughnutChart />
      <RadioBoxGroup options={data} />
      <ListWrapper />
    </div>
  );
};
