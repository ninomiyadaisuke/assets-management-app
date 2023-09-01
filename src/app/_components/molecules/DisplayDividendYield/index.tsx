import { FC } from "react";

import { fetchDividendYieldClient } from "@/services/client/dividendYieldFetch";
import { serverComponentAuthValidateAndReturnUid } from "@/services/server/auth";

import { ValueDisplay } from "../../atoms/ValueDisplay";
type Props = {
  status: "評価額" | "配当額" | "景気敏感割合";
  currency: "yen" | "dollar" | "yenAndDollar";
};

export const DisplayDividendYield: FC<Props> = async ({ status, currency }) => {
  const uid = await serverComponentAuthValidateAndReturnUid();
  const data = await fetchDividendYieldClient(uid, status, currency);
  if (!data) return;
  return (
    <div className="m-auto flex w-5/6 justify-between">
      <h3 className="font-semibold text-gray-600">配当利回り</h3>
      <div>
        <div className="flex gap-2">
          <span className="flex items-center text-xs text-gray-600">
            評価額
          </span>
          <ValueDisplay
            theme="default"
            variant="medium"
            vold="medium"
            unit={"%"}
          >
            {data.marketYield}
          </ValueDisplay>
        </div>
        <div className="flex gap-2">
          <span className="flex items-center text-xs text-gray-600">
            取得額
          </span>
          <ValueDisplay
            theme="default"
            variant="medium"
            vold="medium"
            unit={"%"}
          >
            {data.acquisitionPriceYield}
          </ValueDisplay>
        </div>
      </div>
    </div>
  );
};
