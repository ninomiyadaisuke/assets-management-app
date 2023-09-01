"use client";

import { FC, useState } from "react";

import { ToggleButton } from "@/app/_components/atoms/ToggleButton";
import { ValueDisplay } from "@/app/_components/atoms/ValueDisplay";

type Props = {
  dividendData: {
    marketYield: number;
    acquisitionPriceYield: number;
  };
};

export const DisplayDividendYield: FC<Props> = ({
  dividendData: { marketYield, acquisitionPriceYield },
}) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="m-auto flex w-5/6 justify-between">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-gray-600">配当利回り</h3>
        <ToggleButton onChange={() => setChecked((prev) => !prev)} />
      </div>
      <ValueDisplay
        className="block self-end"
        theme="default"
        variant="medium"
        vold="medium"
        unit={"%"}
      >
        {`年利 ${checked ? acquisitionPriceYield : marketYield}`}
      </ValueDisplay>
    </div>
  );
};
