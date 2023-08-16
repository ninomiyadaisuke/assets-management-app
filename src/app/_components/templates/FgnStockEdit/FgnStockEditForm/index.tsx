"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, Fragment, use } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { ErrorMessage } from "@/app/_components/atoms/ErrorMessage";
import { TextboxWithError } from "@/app/_components/molecules/TextboxWithError";
import { ConfirmSubmitButton } from "@/app/_components/organisms/ConfirmSubmitButton";
import { DeleteConfirmationButton } from "@/app/_components/organisms/DeleteConfirmationButton";
import { useAlertDialog } from "@/hooks/useAlertDialog";
import { useHandleFgnStockSubmission } from "@/hooks/useHandleStockSubmission";
import { useManageFgnAccountTypes } from "@/hooks/useManageJaAccountTypes";
import {
  createFgnStockSchema,
  UpdateFgnStockType,
} from "@/libs/schema/createFgnStock";
import { FgnStockReturn } from "@/services/server/fgnStockEdit";

type Props = {
  id: string;
  fetchStock: Promise<FgnStockReturn>;
  uid: string;
};

export type UpdateFgnStockInput = {
  numberOfSharesHeld?: number;
  acquisitionPrice?: number;
  acquisitionPriceJPY?: number;
  holdingId: string;
  accountType: string;
};

export type FgnValues = {
  numberOfSharesHeld: number[];
  acquisitionPrice: number[];
  acquisitionPriceJPY: number[];
};

export const FgnStockEditForm: FC<Props> = ({ id, fetchStock, uid }) => {
  const data = use(fetchStock);

  const { stockCode, stockName, holdingIdAndAccountTypes, defaultValues } =
    data;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateFgnStockType>({
    defaultValues,
    resolver: zodResolver(createFgnStockSchema),
  });
  const { hideAlertDialog } = useAlertDialog();

  const { accountTypeAndHoldingIds, handleDeleteDb, handleDelete } =
    useManageFgnAccountTypes(holdingIdAndAccountTypes, reset, defaultValues);

  const { handleSubmission, setErrorMessage, errorMessage } =
    useHandleFgnStockSubmission(
      accountTypeAndHoldingIds,
      defaultValues,
      id,
      uid
    );
  const fields = [
    {
      label: "保有株数",
      registerName: "numberOfSharesHeld" as const,
      error: errors.numberOfSharesHeld,
    },
    {
      label: "取得単価＄",
      registerName: "acquisitionPrice" as const,
      error: errors.acquisitionPrice,
    },
    {
      label: "取得単価円",
      registerName: "acquisitionPriceJPY" as const,
      error: errors.acquisitionPriceJPY,
    },
  ];
  const onSubmit: SubmitHandler<UpdateFgnStockType> = async (values) => {
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
                <div className="mt-2 flex gap-2">
                  <h3>{accountTypeAndHoldingIds[i].accountType}</h3>
                  {/* <DeleteConfirmationButton
                    holdingId={holdingId}
                    index={i}
                    isSubmitting={isSubmitting}
                    handleDelete={handleDelete}
                    handleDeleteDb={handleDeleteDb}
                  /> */}
                </div>
                {fields.map((field, idx) => (
                  <div key={idx}>
                    <label htmlFor={`${field.label}-${i}`}>{field.label}</label>
                    <TextboxWithError
                      type="tel"
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
