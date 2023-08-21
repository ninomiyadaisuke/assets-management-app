import { FC } from "react";

import { RadioBoxGroup } from "@/app/_components/molecules/RadioBoxGroup";

import { JaAndFgnDoughnutChart } from "./JandFgnDoughnutChart";
import { ListWrapper } from "./ListWrapper";

const data = ["評価額", "配当額"];

export const JaAndFgnGraph: FC = () => {
  return (
    <div>
      <JaAndFgnDoughnutChart />
      <RadioBoxGroup options={data} />
      <ListWrapper />
    </div>
  );
};
