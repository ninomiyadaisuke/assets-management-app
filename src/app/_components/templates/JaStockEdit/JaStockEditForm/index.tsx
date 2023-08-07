"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, Fragment, use } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/app/_components/atoms/Button";
import { TextboxWithError } from "@/app/_components/molecules/TextboxWithError";
import { AlertDialog } from "@/app/_components/organisms/AlertDialog";
import { useAlertDialog } from "@/hooks/useAlertDialog";
import { useCheck } from "@/hooks/useCheck";
import { useManageJaAccountTypes } from "@/hooks/useManageJaAccountTypes";
import { createStockSchema, UpdateStockType } from "@/libs/schema/createStock";
import {
  createJaStocksClient,
  updateJaStocksClient,
} from "@/services/client/JaStockEdit";
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

export const JaStockEditForm: FC<Props> = ({ id, fetchStock }) => {
  const data = use(fetchStock);
  const { stockCode, stockName, holdingIdAndAccountTypes, defaultValues } =
    data;
  const router = useRouter();
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
  const { setIsChecked } = useCheck();
  const { showAlertDialog, hideAlertDialog } = useAlertDialog();
  const onSubmit: SubmitHandler<UpdateStockType> = async (values) => {
    const dataArray: UpdateJaStockInput[] = [];

    accountTypeAndHoldingIds.forEach(({ holdingId, accountType }, i) => {
      const data: UpdateJaStockInput = {
        holdingId,
        accountType,
      };

      const isUpdateOnly = accountTypeAndHoldingIds.every(
        (data) => data.holdingId !== ""
      );
      const handleDataChange = (
        valueIndex: number,
        defaultValueIndex: number,
        fieldName: keyof UpdateStockType,
        value: {
          numberOfSharesHeld: number[];
          acquisitionPrice: number[];
        },
        isHoldingId = true
      ) => {
        if (
          values[fieldName][valueIndex] !==
            value[fieldName][defaultValueIndex] &&
          isHoldingId
        ) {
          data[fieldName] = values[fieldName][valueIndex];
        }
        if (!isHoldingId) {
          data[fieldName] = values[fieldName][valueIndex];
        }
      };
      if (isUpdateOnly) {
        handleDataChange(i, i, "acquisitionPrice", defaultValues);
        handleDataChange(i, i, "numberOfSharesHeld", defaultValues);
      } else {
        handleDataChange(
          i,
          0,
          "numberOfSharesHeld",
          defaultValues,
          !!holdingId
        );
        handleDataChange(i, 0, "acquisitionPrice", defaultValues, !!holdingId);
      }

      if (Object.keys(data).length > 2) {
        dataArray.push(data);
      }
    });

    if (dataArray.length === 0) return;
    const isCreate = dataArray.some((data) => data.holdingId === "");
    if (isCreate) {
      await createJaStocksClient(dataArray, id).then(() => {
        router.refresh();
        setIsChecked(false);
        hideAlertDialog();
        router.back();
      });
    } else {
      await updateJaStocksClient(dataArray, id).then(() => {
        hideAlertDialog();
        router.refresh();
        router.back();
      });
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
      <Button
        disabled={isSubmitting}
        type="button"
        onClick={() => showAlertDialog({ message: "登録内容を更新しますか？" })}
      >
        送信
      </Button>
      <AlertDialog
        buttonComponent={(label) => (
          <Button disabled={isSubmitting} type="submit">
            {label}
          </Button>
        )}
      />
    </form>
  );
};
