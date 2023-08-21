import { FC } from "react";

import { RadioBoxGroup } from "@/app/_components/molecules/RadioBoxGroup";

import { JaDoughnutChart } from "./JaDoughnutChart";
import { ListWrapper } from "./ListWrapper";

const data = ["評価額", "配当額", "景気敏感割合"];
export const JaGraph: FC = () => {
  return (
    <div>
      <JaDoughnutChart />
      <RadioBoxGroup options={data} />
      <ListWrapper />
    </div>
  );
};
