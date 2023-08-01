"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";

import { Button } from "@/app/_components/atoms/Button";
import { TextboxWithError } from "@/app/_components/molecules/TextboxWithError";
import { useAssetType } from "@/hooks/useAssetType";
import { useStockStatus } from "@/hooks/useStockStatus";

export const JaStockCreateForm: FC = () => {
  const router = useRouter();
  const { stockCode, stockName, industry, dividend, latestStockPrice } =
    useStockStatus();
  const { assetType } = useAssetType();
  return (
    <form className="flex flex-col gap-7">
      <div className="flex flex-col gap-5">
        <fieldset className="flex flex-col gap-3">
          <legend className="pb-1 font-semibold text-gray-600">
            極洋 特定口座
          </legend>
          <div>
            <label htmlFor={`保有株数-1`} className="text-sm text-gray-600">
              保有株数
            </label>
            <TextboxWithError id="保有株数-1" />
          </div>
          <div>
            <label htmlFor={`取得単価-1`} className="text-sm text-gray-600">
              取得単価
            </label>
            <TextboxWithError id="取得単価-1" />
          </div>
        </fieldset>
        <fieldset className="flex flex-col gap-3">
          <legend className="pb-1 font-semibold text-gray-600">
            極洋 新NISA口座
          </legend>
          <div>
            <label htmlFor={`保有株数-2`} className="text-sm text-gray-600">
              保有株数
            </label>
            <TextboxWithError id="保有株数-2" />
          </div>
          <div>
            <label htmlFor={`取得単価-2`} className="text-sm text-gray-600">
              取得単価
            </label>
            <TextboxWithError id="取得単価-2" />
          </div>
        </fieldset>
      </div>
      <Button>送信</Button>
    </form>
  );
};
