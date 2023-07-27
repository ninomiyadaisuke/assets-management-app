"use client";
import { usePathname } from "next/navigation";
import { FC } from "react";

import { ValueDisplay } from "@/app/_components/atoms/ValueDisplay";

type Props = {
  total: number;
};

export const TotalStocks: FC<Props> = ({ total }) => {
  const pathname = usePathname();
  const unit = pathname === "/" ? "円" : "＄";
  return (
    <div className="flex justify-between bg-blue-50 px-3 py-4">
      <h1 className="flex items-end text-blue-900">保有資産合計</h1>
      <ValueDisplay
        theme="default"
        variant="extraLarge"
        vold="medium"
        unit={unit}
      >
        {total}
      </ValueDisplay>
    </div>
  );
};
