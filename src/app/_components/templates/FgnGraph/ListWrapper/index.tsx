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

export const ListWrapper: FC<Props> = async ({ children, status }) => {
  const uid = await serverComponentAuthValidateAndReturnUid();
  const data = await fetchFgnGraphListClient(uid, status);
  return (
    <div className="m-auto mt-8 flex w-5/6 flex-col gap-6">
      {data.result.map((item, i) => {
        const test = { ...item, color: colors[i] };
        return children(test);
      })}
    </div>
  );
};
