"use client";
import { FC } from "react";

import { RadioGroup } from "@/app/_components/molecules/RadioGroup";
import { JaStockCreateForm } from "@/app/_components/templates/JaStockCreate/JaStockCreateForm";
import { SearchForm } from "@/app/_components/templates/JaStockCreate/SearchForm";
import { useAlertDialog } from "@/hooks/useAlertDialog";
import { useStockStatus } from "@/hooks/useStockStatus";

export const JaStockCreate: FC = () => {
  const { stockName } = useStockStatus();
  const { showAlertDialog, hideAlertDialog } = useAlertDialog();
  return (
    <div className="flex grow flex-col gap-9">
      <SearchForm />
      <RadioGroup />
      <JaStockCreateForm
        title="新規株式登録"
        onClickSave={() =>
          showAlertDialog({ message: `新しく${stockName}を登録しますか？` })
        }
        onValid={async (input) => {
          hideAlertDialog();
          try {
          } catch (error) {}
        }}
        onInvalid={() => hideAlertDialog()}
      />
    </div>
  );
};
