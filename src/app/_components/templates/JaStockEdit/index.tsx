import { FC, Suspense } from "react";

import { Checkbox } from "@/app/_components/atoms/Checkbox";
import { Spinner } from "@/app/_components/atoms/Spinner";
import { JaStockEditForm } from "@/app/_components/templates/JaStockEdit/JaStockEditForm";
import { fetchStockData } from "@/services/client/JaStockEdit";
import { JaStockReturn } from "@/services/server/JaStockEdit";

type Props = {
  id: string;
};

const accountType = (data: JaStockReturn) => {
  if (data.holdingIdAndAccountTypes.length === 0) return;
  switch (data.holdingIdAndAccountTypes[0].accountType) {
    case "特定口座":
      return "NISA口座";
    case "新NISA口座":
      return "特定口座";
  }
};

export const JaStockEdit: FC<Props> = async ({ id }) => {
  const data = await fetchStockData(id);

  data.holdingIdAndAccountTypes.length;
  return (
    <div className="flex flex-col gap-3">
      {data.holdingIdAndAccountTypes.length === 1 && (
        <Checkbox label={`${accountType(data)}を追加しますか？`} />
      )}
      <Suspense fallback={<Spinner />}>
        <JaStockEditForm fetchStock={fetchStockData(id)} id={id} />
      </Suspense>
    </div>
  );
};
