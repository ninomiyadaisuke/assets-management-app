import { FC } from "react";

import { DoughnutChart } from "@/app/_components/organisms/DoughnutChart";
import { fetchFgnGraphClient } from "@/services/client/fgnGraphFetch";
import { serverComponentAuthValidateAndReturnUid } from "@/services/server/auth";

type Props = {
  status: "評価額" | "配当額" | "景気敏感割合";
};

export const FgnDoughnutChart: FC<Props> = async ({ status }) => {
  const uid = await serverComponentAuthValidateAndReturnUid();
  const data = await fetchFgnGraphClient(uid, status);

  return (
    <DoughnutChart
      data={data.result}
      title={status === "評価額" ? "評価額" : "配当額"}
      total={data.total}
    />
  );
};
