import dynamic from "next/dynamic";
import { FC } from "react";

import { fetchJaGraphClient } from "@/services/client/jaGraphFetch";
import { serverComponentAuthValidateAndReturnUid } from "@/services/server/auth";

const DoughnutChart = dynamic(async () => {
  const { DoughnutChart: DoughnutChart } = await import(
    "@/app/_components/organisms/DoughnutChart"
  );
  return { default: DoughnutChart };
});

type Props = {
  status: "評価額" | "配当額" | "景気敏感割合";
};

export const JaDoughnutChart: FC<Props> = async ({ status }) => {
  const uid = await serverComponentAuthValidateAndReturnUid();
  const data = await fetchJaGraphClient(uid, status);
  return (
    <div>
      <DoughnutChart
        data={data.result}
        total={data.total}
        title={status === "評価額" ? "評価額" : "配当額"}
      />
    </div>
  );
};
