import dynamic from "next/dynamic";
import { FC } from "react";

import { colors } from "@/libs/colors";

const DoughnutChart = dynamic(async () => {
  const { DoughnutChart: DoughnutChart } = await import(
    "@/app/_components/organisms/DoughnutChart"
  );
  return { default: DoughnutChart };
});

export const data = [
  { id: "stock1", value: 11.1 },
  { id: "stock2", value: 10.0 },
  { id: "stock3", value: 9.7 },
  { id: "stock4", value: 9.3 },
  { id: "stock5", value: 9.2 },
  { id: "stock6", value: 7.9 },
  { id: "stock7", value: 7.1 },
  { id: "stock8", value: 7.1 },
  { id: "stock9", value: 6.6 },
  { id: "stock10", value: 6.6 },
  { id: "stock11", value: 4.8 },
  { id: "stock12", value: 4.4 },
  { id: "stock13", value: 3.4 },
  { id: "stock14", value: 1.7 },
  { id: "stock15", value: 1.1 },
];

export const JaDoughnutChart: FC = async () => {
  return (
    <div>
      <DoughnutChart data={data} total={1000000} title={"評価額"} />
    </div>
  );
};
