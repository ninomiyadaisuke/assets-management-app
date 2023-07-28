import { FC } from "react";

import { Switch } from "@/app/_components/atoms/Switch";

const exchangeRate = 140;

export const ExchangeRateWithSwitch: FC = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">{`USD/JPY ¥${exchangeRate}`}</span>
      <Switch />
    </div>
  );
};
