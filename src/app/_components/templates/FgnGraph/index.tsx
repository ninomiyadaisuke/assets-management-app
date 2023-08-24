import { FC, Suspense } from "react";

import { RadioBoxGroup } from "@/app/_components/molecules/RadioBoxGroup";

import { Spinner } from "../../atoms/Spinner";
import { TotalPriceByType } from "../../molecules/TotalPriceByType";
import { FgnDoughnutChart } from "./FgnDoughnutChart";
import { ListWrapper } from "./ListWrapper";

const data = ["評価額", "配当額", "景気敏感割合"];

type Props = {
  status: "評価額" | "配当額" | "景気敏感割合";
};

export const FgnGraph: FC<Props> = ({ status }) => {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <FgnDoughnutChart status={status} />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <div className="flex justify-center">
          <RadioBoxGroup options={data} status={status} />
        </div>
        <ListWrapper
          status={status}
          children={(item) => (
            <TotalPriceByType
              title={item.title}
              price={item.price}
              color={item.color}
            />
          )}
        />
      </Suspense>
    </>
  );
};
