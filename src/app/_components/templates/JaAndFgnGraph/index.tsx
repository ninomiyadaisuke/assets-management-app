import { FC } from "react";

import { RadioBoxGroup } from "@/app/_components/molecules/RadioBoxGroup";

import { JaAndFgnDoughnutChart } from "./JandFgnDoughnutChart";
import { ListWrapper } from "./ListWrapper";

const data = ["評価額", "配当額"];

type Props = {
  status: "評価額" | "配当額" | "景気敏感割合";
};

export const JaAndFgnGraph: FC<Props> = ({ status }) => {
  return (
    <div>
      <JaAndFgnDoughnutChart />
      <RadioBoxGroup options={data} status={status ? status : "評価額"} />
      <ListWrapper />
    </div>
  );
};
