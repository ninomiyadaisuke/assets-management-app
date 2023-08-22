import { FC, Suspense } from "react";

import { RadioBoxGroup } from "@/app/_components/molecules/RadioBoxGroup";

import { Spinner } from "../../atoms/Spinner";
import { FgnDoughnutChart } from "./FgnDoughnutChart";
import { ListWrapper } from "./ListWrapper";

const data = ["評価額", "配当額", "景気敏感割合"];

type Props = {
  status: "評価額" | "配当額" | "景気敏感割合";
};

export const FgnGraph: FC<Props> = ({ status }) => {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <FgnDoughnutChart status={status} />
      </Suspense>
      <div className="flex justify-center">
        <RadioBoxGroup options={data} status={status} />
      </div>
      <ListWrapper />
    </div>
  );
};
