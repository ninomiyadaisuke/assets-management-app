import { FC } from "react";

import { Switch } from "@/app/_components/atoms/Switch";
import { fetchLatestUsdToJpyRateClient } from "@/services/client/exchangeRate";

export const ExchangeRateWithSwitch: FC = async () => {
  const {
    conversion_rates: { JPY },
  } = await fetchLatestUsdToJpyRateClient();
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">{`USD/JPY ¥${JPY}`}</span>
      <Switch />
    </div>
  );
};
