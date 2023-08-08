"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, Fragment, use } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { TextboxWithError } from "@/app/_components/molecules/TextboxWithError";
import { ConfirmSubmitButton } from "@/app/_components/organisms/ConfirmSubmitButton";
import { useHandleStockSubmission } from "@/hooks/useHandleStockSubmission";
import { useManageJaAccountTypes } from "@/hooks/useManageJaAccountTypes";
import { createStockSchema, UpdateStockType } from "@/libs/schema/createStock";
import { JaStockReturn } from "@/services/server/JaStockEdit";

type Props = {
  id: string;
  fetchStock: Promise<JaStockReturn>;
};

export type UpdateJaStockInput = {
  numberOfSharesHeld?: number;
  acquisitionPrice?: number;
  holdingId: string;
  accountType: string;
};

export type Values = {
  numberOfSharesHeld: number[];
  acquisitionPrice: number[];
};

export const JaStockEditForm: FC<Props> = ({ id, fetchStock }) => {
  const data = use(fetchStock);
  const { stockCode, stockName, holdingIdAndAccountTypes, defaultValues } =
    data;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateStockType>({
    defaultValues,
    resolver: zodResolver(createStockSchema),
  });
  const { accountTypeAndHoldingIds } = useManageJaAccountTypes(
    holdingIdAndAccountTypes,
    reset,
    defaultValues
  );

  const handleSubmission = useHandleStockSubmission(
    accountTypeAndHoldingIds,
    defaultValues,
    id
  );

  const onSubmit: SubmitHandler<UpdateStockType> = async (values) => {
    const {
      dataArray,
      isCreate,
      handleCreateStockSubmission,
      handleUpdateStockSubmission,
    } = handleSubmission(values);

    if (dataArray.length === 0) return;
    if (isCreate) {
      await handleCreateStockSubmission();
    } else {
      await handleUpdateStockSubmission();
    }
  };
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>{`${stockCode}:${stockName}`}</legend>
        <div className="flex flex-col gap-5">
          {accountTypeAndHoldingIds.map((accountTypeAndHoldingId, i) => {
            const holdingId = accountTypeAndHoldingId.holdingId;
            return (
              <Fragment key={i}>
                <div>
                  <label htmlFor={`保有株数-${i}`}>保有株数</label>
                  <TextboxWithError
                    id={`保有株数-${i}`}
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
                  <label htmlFor={`取得単価-${i}`}>取得単価</label>
                  <TextboxWithError
                    id={`取得単価-${i}`}
                    {...register(`acquisitionPrice.${i}`, {
                      valueAsNumber: true,
                    })}
                    error={
                      errors.acquisitionPrice &&
                      errors.acquisitionPrice[i]?.message
                    }
                  />
                </div>
              </Fragment>
            );
          })}
        </div>
      </fieldset>
      <ConfirmSubmitButton
        isSubmitting={isSubmitting}
        alertDialogState={{ message: "登録内容を更新しますか？" }}
      />
    </form>
  );
};
