import { FC, ReactElement } from "react";

import { NotItems } from "@/app/_components/atoms/NotItems";
import { Color, colors } from "@/libs/colors";
import { fetchJaAndFgnGraphListClient } from "@/services/client/jaAndFgnList";
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
  const data = await fetchJaAndFgnGraphListClient(uid, status);
  const { result } = data;
  const filteredResult = result.filter((item) => item.price !== 0);
  return (
    <div className="m-auto mt-8 flex w-5/6 flex-col gap-6">
      {filteredResult.length > 0 ? (
        filteredResult.map((item, i) => {
          const test = { ...item, color: colors[i] };
          return children(test);
        })
      ) : (
        <NotItems />
      )}
    </div>
  );
};
