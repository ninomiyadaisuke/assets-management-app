import { FC } from "react";

import { RadioBoxGroup } from "@/app/_components/molecules/RadioBoxGroup";

import { DoughnutChart } from "./DoughnutChart";
import { ListWrapper } from "./ListWrapper";

export const FgnGraph: FC = () => {
  return (
    <div>
      <DoughnutChart />
      <RadioBoxGroup />
      <ListWrapper />
    </div>
  );
};
