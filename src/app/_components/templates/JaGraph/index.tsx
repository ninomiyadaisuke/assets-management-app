import { FC, Suspense } from "react";

import { RadioBoxGroup } from "@/app/_components/molecules/RadioBoxGroup";

import { Spinner } from "../../atoms/Spinner";
import { JaDoughnutChart } from "./JaDoughnutChart";
import { ListWrapper } from "./ListWrapper";

const data = ["評価額", "配当額", "景気敏感割合"];
type Props = {
  status: "評価額" | "配当額" | "景気敏感割合";
};
export const JaGraph: FC<Props> = ({ status }) => {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <JaDoughnutChart status={status} />
      </Suspense>
      <RadioBoxGroup options={data} status={status} />
      <ListWrapper />
    </div>
  );
};