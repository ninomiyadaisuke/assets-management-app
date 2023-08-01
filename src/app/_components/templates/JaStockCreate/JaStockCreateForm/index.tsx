"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/app/_components/atoms/Button";
import { TextboxWithError } from "@/app/_components/molecules/TextboxWithError";
import { useAssetType } from "@/hooks/useAssetType";
import { useStockStatus } from "@/hooks/useStockStatus";

const defaultValues = {
  numberOfSharesHeld: [0],
  acquisitionPrice: [0],
};

const numberOfSharesHeldSchema = z.number().int().min(1);
const acquisitionPriceSchema = z.number().min(1);

const schema = z.object({
  numberOfSharesHeld: z.array(numberOfSharesHeldSchema),
  acquisitionPrice: z.array(acquisitionPriceSchema),
});

type Schema = z.infer<typeof schema>;

type ReqType = {
  assetType: "両方" | "新NISA口座" | "特定口座";
  stockName: string;
  stockCode: string;
  dividend: number;
  latestStockPrice: number;
  industry: string;
  numberOfSharesHeld: number[];
  acquisitionPrice: number[];
};

export const JaStockCreateForm: FC = () => {
  const router = useRouter();
  const { stockCode, stockName, industry, dividend, latestStockPrice } =
    useStockStatus();
  const { assetType, getAccountTypes } = useAssetType();

  useEffect(() => {
    if (assetType !== "両方") return;
    reset({
      numberOfSharesHeld: [...defaultValues.numberOfSharesHeld, 0],
      acquisitionPrice: [...defaultValues.acquisitionPrice, 0],
    });
  }, [assetType]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Schema>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  return (
    <form className="flex flex-col gap-7">
      <div className="flex flex-col gap-5">
        {getAccountTypes().map((account, i) => {
          return (
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
          );
        })}
        {/* <fieldset className="flex flex-col gap-3">
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
        </fieldset> */}
      </div>
      <Button>送信</Button>
    </form>
  );
};
