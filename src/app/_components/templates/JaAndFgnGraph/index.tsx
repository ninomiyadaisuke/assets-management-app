import { FC, Suspense } from "react";

import { RadioBoxGroup } from "@/app/_components/molecules/RadioBoxGroup";

import { Spinner } from "../../atoms/Spinner";
import { TotalPriceByType } from "../../molecules/TotalPriceByType";
import { JaAndFgnDoughnutChart } from "./JaAndFgnDoughnutChart";
import { ListWrapper } from "./ListWrapper";

const data = ["評価額", "配当額"];

type Props = {
  status: "評価額" | "配当額" | "景気敏感割合";
};

export const JaAndFgnGraph: FC<Props> = ({ status }) => {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <JaAndFgnDoughnutChart status={status} />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <div className="flex justify-center">
          <RadioBoxGroup options={data} status={status ? status : "評価額"} />
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
