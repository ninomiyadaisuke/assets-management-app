import { FC, Suspense } from "react";

import { Checkbox } from "@/app/_components/atoms/Checkbox";
import { FgnStockEditForm } from "@/app/_components/templates/FgnStockEdit/FgnStockEditForm";
import { fetchFgnStocksClient } from "@/services/client/fgnStockEdit";
import { serverComponentAuthValidateAndReturnUid } from "@/services/server/auth";
import { FgnStockReturn } from "@/services/server/fgnStockEdit";

import { Spinner } from "../../atoms/Spinner";
type Props = {
  id: string;
};

const accountType = (data: FgnStockReturn) => {
  if (data.holdingIdAndAccountTypes.length === 0) return;
  switch (data.holdingIdAndAccountTypes[0].accountType) {
    case "特定口座":
      return "NISA口座";
    case "新NISA口座":
      return "特定口座";
  }
};

export const FgnStockEdit: FC<Props> = async ({ id }) => {
  const uid = await serverComponentAuthValidateAndReturnUid();
  const data = await fetchFgnStocksClient(uid, id);

  return (
    <div className="flex flex-col gap-3">
      {data.holdingIdAndAccountTypes.length === 1 && (
        <Checkbox label={`${accountType(data)}を追加しますか？`} />
      )}
      <Suspense fallback={<Spinner />}>
        <FgnStockEditForm
          fetchStock={fetchFgnStocksClient(uid, id)}
          id={id}
          uid={uid}
        />
      </Suspense>
    </div>
  );
};
