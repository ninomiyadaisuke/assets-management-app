import { FC } from "react";

import { DoughnutChart } from "@/app/_components/organisms/DoughnutChart";
import { fetchJaAndFgnGraphClient } from "@/services/client/jaAndFgnFetch";
import { serverComponentAuthValidateAndReturnUid } from "@/services/server/auth";

type Props = {
  status: "評価額" | "配当額" | "景気敏感割合";
};

export const JaAndFgnDoughnutChart: FC<Props> = async ({ status }) => {
  const uid = await serverComponentAuthValidateAndReturnUid();
  const data = await fetchJaAndFgnGraphClient(uid, status);
  return (
    <DoughnutChart
      data={data.result}
      title={status === "評価額" ? "評価額" : "配当額"}
      total={data.total}
    />
  );
};
