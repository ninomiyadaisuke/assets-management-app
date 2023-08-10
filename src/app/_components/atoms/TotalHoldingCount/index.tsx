import { FC } from "react";

import { fetchJaTotalHoldingCountClient } from "@/services/client/totalHoldingCount";
import { serverComponentAuthValidateAndReturnUid } from "@/services/server/test";

type Props = {
  country: "ja" | "foreign";
};

export const TotalHoldingCount: FC<Props> = async ({ country }) => {
  const uid = await serverComponentAuthValidateAndReturnUid();
  const totalCount = await fetchJaTotalHoldingCountClient(uid, country);
  return (
    <span className="text-sm font-semibold text-gray-500">{`全${totalCount}件`}</span>
  );
};
