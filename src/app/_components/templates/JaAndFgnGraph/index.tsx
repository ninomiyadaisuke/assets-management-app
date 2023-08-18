import { FC } from "react";

import { RadioBoxGroup } from "@/app/_components/molecules/RadioBoxGroup";

import { DoughnutChart } from "./DoughnutChart";
import { ListWrapper } from "./ListWrapper";

const data = ["評価額", "配当額"];

export const JaAndFgnGraph: FC = () => {
  return (
    <div>
      <DoughnutChart />
      <RadioBoxGroup options={data} />
      <ListWrapper />
    </div>
  );
};
