import { FC } from "react";

import { Checkbox } from "@/app/_components/atoms/Checkbox";
import { FgnStockEditForm } from "@/app/_components/templates/FgnStockEdit/FgnStockEditForm";
type Props = {
  id: string;
};

export const FgnStockEdit: FC<Props> = async ({ id }) => {
  return (
    <div className="flex flex-col gap-3">
      <Checkbox label="を追加しますか？" />
      <FgnStockEditForm id={id} />
    </div>
  );
};
