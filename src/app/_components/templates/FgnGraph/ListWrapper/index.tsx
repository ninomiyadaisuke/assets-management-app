import { FC, ReactElement } from "react";

import { Color, colors } from "@/libs/colors";
import { fetchFgnGraphListClient } from "@/services/client/fgnGraphList";
import { serverComponentAuthValidateAndReturnUid } from "@/services/server/auth";

type Props = {
  children: (item: {
    title: string;
    color: Color;
    price: number;
  }) => ReactElement;
  status: "評価額" | "配当額" | "景気敏感割合";
};

const data = [
  { title: "食料品", price: 300000 },
  { title: "建築業", price: 300000 },
  { title: "化学", price: 300000 },
  { title: "水産・農林業", price: 300000 },
  { title: "食料品", price: 300000 },
];

export const ListWrapper: FC<Props> = async ({ children, status }) => {
  const uid = await serverComponentAuthValidateAndReturnUid();
  const test = await fetchFgnGraphListClient(uid, status);
  return (
    <div className="m-auto mt-8 flex w-5/6 flex-col gap-2">
      {data.map((item, i) => {
        const test = { ...item, color: colors[i] };
        return children(test);
      })}
    </div>
  );
};
