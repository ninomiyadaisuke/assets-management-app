"use client";
import { FC } from "react";

import { RadioGroup } from "@/app/_components/molecules/RadioGroup";
import { SearchedInfoTable } from "@/app/_components/organisms/SearchedInfoTable";
import { JaStockCreateForm } from "@/app/_components/templates/JaStockCreate/JaStockCreateForm";
import { SearchForm } from "@/app/_components/templates/JaStockCreate/SearchForm";
import { useAlertDialog } from "@/hooks/useAlertDialog";
import { useLoading } from "@/hooks/useLoading";
import { useStockStatus } from "@/hooks/useStockStatus";

import { Spinner } from "../../atoms/Spinner";

export const JaStockCreate: FC = () => {
  const { stockName } = useStockStatus();
  const { showAlertDialog, hideAlertDialog } = useAlertDialog();
  const { isLoading } = useLoading();
  return (
    <div className="flex grow flex-col gap-9">
      <SearchForm />
      {stockName ? (
        <>
          <SearchedInfoTable unit="円" />
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
        </>
      ) : (
        isLoading && <Spinner />
      )}
    </div>
  );
};
