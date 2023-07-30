import { FC } from "react";

import { RadioGroup } from "@/app/_components/molecules/RadioGroup";

import { JaStockCreateForm } from "./JaStockCreateForm";
import { SearchForm } from "./SearchForm";

export const JaStockCreate: FC = () => {
  return (
    <div className="flex flex-col gap-9">
      <SearchForm />
      <RadioGroup />
      <JaStockCreateForm />
    </div>
  );
};
