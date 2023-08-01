"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { Button } from "@/app/_components/atoms/Button";
import { TextboxWithError } from "@/app/_components/molecules/TextboxWithError";
import { AlertDialog } from "@/app/_components/organisms/AlertDialog";
import { useAssetType } from "@/hooks/useAssetType";
import { useResetStockFrom } from "@/hooks/useResetStockFrom";
import { createStockSchema, CreateStockType } from "@/libs/schema/createStock";

const defaultValues = {
  numberOfSharesHeld: [""],
  acquisitionPrice: [""],
};

type Props<T extends FieldValues = CreateStockType> = {
  title: string;
  onClickSave: () => void;
  onValid: SubmitHandler<T>;
  onInvalid?: SubmitErrorHandler<T>;
};

export const JaStockCreateForm: FC<Props> = (props) => {
  const { title, onValid, onInvalid, onClickSave } = props;
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

  return (
    <form
      onSubmit={handleSubmit(onValid, onInvalid)}
      aria-label={title}
      className="flex flex-col gap-7"
    >
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
      <Button type="button" onClick={onClickSave}>
        送信
      </Button>
      <AlertDialog />
    </form>
  );
};

// type ReqType = {
//   assetType: "両方" | "新NISA口座" | "特定口座";
//   stockName: string;
//   stockCode: string;
//   dividend: number;
//   latestStockPrice: number;
//   industry: string;
//   numberOfSharesHeld: number[];
//   acquisitionPrice: number[];
// };
