"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";

import { RadioGroup } from "@/app/_components/molecules/RadioGroup";
import { SearchedInfoTable } from "@/app/_components/organisms/SearchedInfoTable";
import { JaStockCreateForm } from "@/app/_components/templates/JaStockCreate/JaStockCreateForm";
import { SearchForm } from "@/app/_components/templates/JaStockCreate/SearchForm";
import { useAlertDialog } from "@/hooks/useAlertDialog";
import { useAssetType } from "@/hooks/useAssetType";
import { useStockStatus } from "@/hooks/useStockStatus";
import { createStockData } from "@/services/client/jaStockCreate";

export const JaStockCreate: FC = () => {
  const {
    stockName,
    stockCode,
    irBankCode,
    industry,
    dividend,
    latestStockPrice,
    resetStockStatus,
  } = useStockStatus();
  const { assetType } = useAssetType();
  const { hideAlertDialog } = useAlertDialog();
  const router = useRouter();

  return (
    <div className="flex grow flex-col gap-9">
      <SearchForm />

      <SearchedInfoTable unit="円" />
      {stockCode && (
        <>
          <RadioGroup />
          <JaStockCreateForm
            title="新規株式登録"
            message={`新しく${stockName}を登録しますか？`}
            onValid={async (values) => {
              hideAlertDialog();
              const data = {
                assetType,
                stockCode,
                stockName,
                irBankCode,
                dividend,
                latestStockPrice,
                industry,
                numberOfSharesHeld: values.numberOfSharesHeld,
                acquisitionPrice: values.acquisitionPrice,
              };

              try {
                await createStockData(data);
                router.refresh();
                router.back();
                resetStockStatus();
              } catch (error) {}
            }}
            onInvalid={() => hideAlertDialog()}
          />
        </>
      )}
    </div>
  );
};
