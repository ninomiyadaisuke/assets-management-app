"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { TextboxWithError } from "@/app/_components/molecules/TextboxWithError";
import { ConfirmSubmitButton } from "@/app/_components/organisms/ConfirmSubmitButton";
import { useAlertDialog } from "@/hooks/useAlertDialog";
import { useAssetType } from "@/hooks/useAssetType";
import { useStockStatus } from "@/hooks/useStockStatus";
import {
  createFgnStockSchema,
  CreateFgnStockType,
} from "@/libs/schema/createFgnStock";
import { createFgnStockClient } from "@/services/client/fgnStockCreate";

const defaultValues = {
  numberOfSharesHeld: [0],
  acquisitionPrice: [0],
  acquisitionPriceJPY: [0],
};

type Props = {
  uid: string;
};

export const FgnStockCreateForm: FC<Props> = ({ uid }) => {
  const { getAccountTypes } = useAssetType();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateFgnStockType>({
    defaultValues,
    resolver: zodResolver(createFgnStockSchema),
  });
  const { assetType } = useAssetType();
  const router = useRouter();
  const {
    stockName,
    stockCode,
    industry,
    dividend,
    latestStockPrice,
    resetStockStatus,
  } = useStockStatus();
  const { hideAlertDialog } = useAlertDialog();

  useEffect(() => {
    if (assetType !== "両方") return;
    reset({
      numberOfSharesHeld: [...defaultValues.numberOfSharesHeld, 0],
      acquisitionPrice: [...defaultValues.acquisitionPrice, 0],
      acquisitionPriceJPY: [...defaultValues.acquisitionPriceJPY, 0],
    });
  }, [assetType]);

  if (!stockCode) return null;
  const onSubmit: SubmitHandler<CreateFgnStockType> = async (values) => {
    const data = {
      uid,
      assetType,
      stockCode,
      stockName,
      dividend,
      latestStockPrice,
      industry,
      numberOfSharesHeld: values.numberOfSharesHeld,
      acquisitionPrice: values.acquisitionPrice,
      acquisitionPriceJPY: values.acquisitionPriceJPY,
    };
    await createFgnStockClient(data);
    resetStockStatus();
    router.refresh();
    router.back();
  };

  const onInvalid = () => {
    hideAlertDialog();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="flex flex-col gap-7"
    >
      <div className="flex flex-col gap-5">
        {getAccountTypes().map((account, i) => {
          return (
            <fieldset key={i}>
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
                  disabled={isSubmitting}
                  id={`保有株数-${i}`}
                  type="tel"
                  {...register(`numberOfSharesHeld.${i}`, {
                    valueAsNumber: true,
                  })}
                  error={
                    errors.numberOfSharesHeld &&
                    errors.numberOfSharesHeld[i]?.message
                  }
                />
              </div>
              <div>
                <label
                  htmlFor={`取得単価＄-${i}`}
                  className="text-sm text-gray-600"
                >
                  取得単価＄
                </label>
                <TextboxWithError
                  disabled={isSubmitting}
                  id={`取得単価＄-${i}`}
                  type="tel"
                  {...register(`acquisitionPrice.${i}`, {
                    valueAsNumber: true,
                  })}
                  error={
                    errors.acquisitionPrice &&
                    errors.acquisitionPrice[i]?.message
                  }
                />
              </div>
              <div>
                <label
                  htmlFor={`取得単価円-${i}`}
                  className="text-sm text-gray-600"
                >
                  取得単価円
                </label>
                <TextboxWithError
                  disabled={isSubmitting}
                  id={`取得単価円-${i}`}
                  type="tel"
                  {...register(`acquisitionPriceJPY.${i}`, {
                    valueAsNumber: true,
                  })}
                  error={
                    errors.acquisitionPriceJPY &&
                    errors.acquisitionPriceJPY[i]?.message
                  }
                />
              </div>
            </fieldset>
          );
        })}
      </div>
      <ConfirmSubmitButton
        isSubmitting={isSubmitting}
        alertDialogState={{ message: "新規作成しますか？" }}
      />
    </form>
  );
};
