"use client";

import { ResponsivePie } from "@nivo/pie";
import { FC } from "react";

import { extractColorsUpToIndex } from "@/libs/utils";

type Props = {
  total: number;
  title: string;
  data: {
    id: string;
    value: number;
    label?: string;
  }[];
};
export const DoughnutChart: FC<Props> = ({ data, total, title }) => {
  return (
    <div className="relative h-[300px]">
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        colors={extractColorsUpToIndex(data.length)}
        valueFormat={(value) => `${value}%`}
        padAngle={0.5}
        activeOuterRadiusOffset={8}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={1}
        arcLabelsSkipAngle={20}
        arcLabelsTextColor="#fff"
      />
      <div className="absolute left-2/4 top-[108px] flex translate-x-[-50%] flex-col text-center text-sm">
        <p>{title}</p>
        <p className="text-xs">{total.toLocaleString()}円</p>
      </div>
    </div>
  );
};
