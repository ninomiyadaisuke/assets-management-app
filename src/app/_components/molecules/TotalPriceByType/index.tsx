import { FC } from "react";

import { Dot } from "@/app/_components/atoms/Dot";
import { Color } from "@/libs/colors";

type Props = {
  title: string;
  color: Color;
  price: number;
};

export const TotalPriceByType: FC<Props> = ({ title, color, price }) => {
  return (
    <li className="flex w-full items-center justify-between">
      <div className="flex gap-3">
        <Dot className="self-center" color={color} />
        <p className="text-num-def">{title}</p>
      </div>
      <p className="text-num-def">{price.toLocaleString()}</p>
    </li>
  );
};
