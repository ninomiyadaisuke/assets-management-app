"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, Fragment, use } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { ErrorMessage } from "@/app/_components/atoms/ErrorMessage";
import { TextboxWithError } from "@/app/_components/molecules/TextboxWithError";
import { ConfirmSubmitButton } from "@/app/_components/organisms/ConfirmSubmitButton";
import { useAlertDialog } from "@/hooks/useAlertDialog";
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

  const { handleSubmission, setErrorMessage, errorMessage } =
    useHandleStockSubmission(accountTypeAndHoldingIds, defaultValues, id);

  const { hideAlertDialog } = useAlertDialog();

  const fields = [
    {
      label: "保有株数",
      registerName: "numberOfSharesHeld" as const,
      error: errors.numberOfSharesHeld,
    },
    {
      label: "取得単価",
      registerName: "acquisitionPrice" as const,
      error: errors.acquisitionPrice,
    },
  ];

  const onSubmit: SubmitHandler<UpdateStockType> = async (values) => {
    const {
      dataArray,
      isCreate,
      handleCreateStockSubmission,
      handleUpdateStockSubmission,
    } = handleSubmission(values);

    if (dataArray.length === 0) {
      hideAlertDialog();
      setErrorMessage("変更箇所がないので更新できません。");
      return;
    }

    if (isCreate) {
      await handleCreateStockSubmission();
    } else {
      await handleUpdateStockSubmission();
    }
  };
  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <fieldset>
        <legend>{`${stockCode}:${stockName}`}</legend>
        <div className="flex flex-col gap-5">
          {accountTypeAndHoldingIds.map((accountTypeAndHoldingId, i) => {
            const holdingId = accountTypeAndHoldingId.holdingId;
            return (
              <Fragment key={i}>
                {fields.map((field, idx) => (
                  <div key={idx}>
                    <label htmlFor={`${field.label}-${i}`}>{field.label}</label>
                    <TextboxWithError
                      id={`${field.label}-${i}`}
                      {...register(`${field.registerName}.${i}`, {
                        valueAsNumber: true,
                      })}
                      error={field.error && field.error[i]?.message}
                      onChange={() => setErrorMessage(null)}
                    />
                  </div>
                ))}
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
