import { FC } from "react";

import { FgnStockCreateForm } from "./FgnStockCreateForm";
import { SelectForm } from "./SelectForm";

export const FgnStockCreate: FC = () => {
  return (
    <div className="flex grow flex-col gap-9">
      <SelectForm title="" />
      <FgnStockCreateForm />
    </div>
  );
};
