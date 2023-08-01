"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/app/_components/atoms/Button";
import { TextboxWithError } from "@/app/_components/molecules/TextboxWithError";
import { useAssetType } from "@/hooks/useAssetType";
import { useResetStockFrom } from "@/hooks/useResetStockFrom";
import { useStockStatus } from "@/hooks/useStockStatus";
import { createStockSchema, CreateStockType } from "@/libs/schema/createStock";

const defaultValues = {
  numberOfSharesHeld: [""],
  acquisitionPrice: [""],
};

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
  const { getAccountTypes } = useAssetType();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateStockType>({
    defaultValues,
    resolver: zodResolver(createStockSchema),
  });

  useResetStockFrom(defaultValues, reset);

  const onSubmit: SubmitHandler<CreateStockType> = async (values) => {
    const test = values;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
      <div className="flex flex-col gap-5">
        {getAccountTypes().map((account, i) => {
          return (
            <fieldset key={account} className="flex flex-col gap-3">
              <legend className="pb-1 font-semibold text-gray-600">
                {account}
              </legend>
              <div>
                <label
                  htmlFor={`保有株数-${i}`}
                  className="text-sm text-gray-600"
                >
                  保有株数
                </label>
                <TextboxWithError
                  id={`保有株数-${i}`}
                  type="tel"
                  {...register(`numberOfSharesHeld.${i}`)}
                  error={
                    errors.numberOfSharesHeld &&
                    errors.numberOfSharesHeld[i]?.message
                  }
                />
              </div>
              <div>
                <label
                  htmlFor={`取得単価-${i}`}
                  className="text-sm text-gray-600"
                >
                  取得単価
                </label>
                <TextboxWithError
                  id={`取得単価-${i}`}
                  type="tel"
                  {...register(`acquisitionPrice.${i}`)}
                  error={
                    errors.acquisitionPrice &&
                    errors.acquisitionPrice[i]?.message
                  }
                />
              </div>
            </fieldset>
          );
        })}
      </div>
      <Button>送信</Button>
    </form>
  );
};
