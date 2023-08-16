"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  FgnValues,
  UpdateFgnStockInput,
} from "@/app/_components/templates/FgnStockEdit/FgnStockEditForm";
import {
  UpdateJaStockInput,
  Values,
} from "@/app/_components/templates/JaStockEdit/JaStockEditForm";
import { UpdateFgnStockType } from "@/libs/schema/createFgnStock";
import { UpdateStockType } from "@/libs/schema/createStock";
import {
  createFgnStocksClient,
  updateFgnStocksClient,
} from "@/services/client/fgnStockEdit";
import {
  createJaStocksClient,
  updateJaStocksClient,
} from "@/services/client/JaStockEdit";

import { useAlertDialog } from "./useAlertDialog";
import { useCheck } from "./useCheck";
import { AccountTypeAndHoldingIds } from "./useManageJaAccountTypes";

export const useHandleStockSubmission = (
  accountTypeAndHoldingIds: AccountTypeAndHoldingIds,
  defaultValues: Values,
  id: string
) => {
  const router = useRouter();
  const { setIsChecked } = useCheck();
  const { hideAlertDialog } = useAlertDialog();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmissionLogic = (values: UpdateStockType) => {
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

    const isCreate = dataArray.some((data) => data.holdingId === "");

    const handleCreateStockSubmission = async () => {
      await createJaStocksClient(dataArray, id).then(() => {
        router.refresh();
        setIsChecked(false);
        hideAlertDialog();
        router.back();
      });
    };

    const handleUpdateStockSubmission = async () => {
      await updateJaStocksClient(dataArray, id).then(() => {
        router.refresh();
        setIsChecked(false);
        hideAlertDialog();
        router.back();
      });
    };

    return {
      dataArray,
      isCreate,
      handleCreateStockSubmission,
      handleUpdateStockSubmission,
    };
  };

  return {
    handleSubmission: handleSubmissionLogic,
    setErrorMessage,
    errorMessage,
  };
};

export const useHandleFgnStockSubmission = (
  accountTypeAndHoldingIds: AccountTypeAndHoldingIds,
  defaultValues: FgnValues,
  id: string,
  uid: string
) => {
  const router = useRouter();
  const { setIsChecked } = useCheck();
  const { hideAlertDialog } = useAlertDialog();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleSubmissionLogic = (values: UpdateFgnStockType) => {
    const dataArray: UpdateFgnStockInput[] = [];
    accountTypeAndHoldingIds.forEach(({ holdingId, accountType }, i) => {
      const data: UpdateFgnStockInput = {
        holdingId,
        accountType,
      };

      const isUpdateOnly = accountTypeAndHoldingIds.every(
        (data) => data.holdingId !== ""
      );

      const handleDataChange = (
        valueIndex: number,
        defaultValueIndex: number,
        fieldName: keyof UpdateFgnStockType,
        value: {
          numberOfSharesHeld: number[];
          acquisitionPrice: number[];
          acquisitionPriceJPY: number[];
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
        handleDataChange(i, i, "acquisitionPriceJPY", defaultValues);
      } else {
        handleDataChange(
          i,
          0,
          "numberOfSharesHeld",
          defaultValues,
          !!holdingId
        );
        handleDataChange(i, 0, "acquisitionPrice", defaultValues, !!holdingId);
        handleDataChange(
          i,
          0,
          "acquisitionPriceJPY",
          defaultValues,
          !!holdingId
        );
      }

      if (Object.keys(data).length > 2) {
        dataArray.push(data);
      }
    });
    const isCreate = dataArray.some((data) => data.holdingId === "");
    const handleCreateStockSubmission = async () => {
      await createFgnStocksClient(dataArray, id, uid).then(() => {
        router.refresh();
        setIsChecked(false);
        hideAlertDialog();
        router.back();
      });
    };

    const handleUpdateStockSubmission = async () => {
      await updateFgnStocksClient(dataArray, id).then(() => {
        router.refresh();
        setIsChecked(false);
        hideAlertDialog();
        router.back();
      });
    };
    return {
      dataArray,
      isCreate,
      handleCreateStockSubmission,
      handleUpdateStockSubmission,
    };
  };
  return {
    handleSubmission: handleSubmissionLogic,
    setErrorMessage,
    errorMessage,
  };
};
