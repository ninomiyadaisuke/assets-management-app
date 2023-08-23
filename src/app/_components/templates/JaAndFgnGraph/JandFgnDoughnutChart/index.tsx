import { FC } from "react";

import { DoughnutChart } from "@/app/_components/organisms/DoughnutChart";
import { fetchJaAndFgnGraphClient } from "@/services/client/jaAndFgnFetch";
import { serverComponentAuthValidateAndReturnUid } from "@/services/server/auth";

export const data = [
  { id: "stock1", value: 11.1 },
  { id: "stock2", value: 10.0 },
  { id: "stock3", value: 9.7 },
  { id: "stock4", value: 9.3 },
  { id: "stock5", value: 9.2 },
  { id: "stock6", value: 7.9 },
  { id: "stock7", value: 7.1 },
  { id: "stock8", value: 7.1 },
  { id: "stock9", value: 6.6 },
  { id: "stock10", value: 6.6 },
  { id: "stock11", value: 4.8 },
  { id: "stock12", value: 4.4 },
  { id: "stock13", value: 3.4 },
  { id: "stock14", value: 1.7 },
  { id: "stock15", value: 1.1 },
];

type Props = {
  status: "評価額" | "配当額" | "景気敏感割合";
};

export const JaAndFgnDoughnutChart: FC<Props> = async ({ status }) => {
  const uid = await serverComponentAuthValidateAndReturnUid();
  const test = await fetchJaAndFgnGraphClient(uid, status);
  return <DoughnutChart data={data} title="評価額" total={1000000} />;
};
