import { FC, ReactElement } from "react";

import { Color, colors } from "@/libs/colors";

type Props = {
  children: (item: {
    title: string;
    color: Color;
    price: number;
  }) => ReactElement;
};

const data = [
  { title: "食料品", price: 300000 },
  { title: "建築業", price: 300000 },
  { title: "化学", price: 300000 },
  { title: "水産・農林業", price: 300000 },
  { title: "食料品", price: 300000 },
];

export const ListWrapper: FC<Props> = ({ children }) => {
  return (
    <div className="m-auto mt-8 flex w-5/6 flex-col gap-2">
      {data.map((item, i) => {
        const test = { ...item, color: colors[i] };
        return children(test);
      })}
    </div>
  );
};
