import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UseFormReset } from "react-hook-form";

import { UpdateFgnStockType } from "@/libs/schema/createFgnStock";
import { UpdateStockType } from "@/libs/schema/createStock";
import { deleteJaStockClient } from "@/services/client/jaStockDelete";

import { useAlertDialog } from "./useAlertDialog";
import { useCheck } from "./useCheck";

export const useManageJaAccountTypes = (
  defaultTypes: {
    holdingId: string;
    accountType: string;
  }[],
  reset: UseFormReset<UpdateStockType>,
  defaultValues: UpdateStockType
) => {
  const router = useRouter();
  const { isChecked, setIsChecked } = useCheck();
  const [accountTypes, setAccountTypes] = useState(defaultTypes);
  const { showDeleteAlertDialog, hideAlertDialog } = useAlertDialog();
  const specialAccount = "特定口座";

  useEffect(() => {
    let types = defaultTypes;
    if (isChecked) {
      if (defaultTypes[0].accountType === specialAccount) {
        types = [...defaultTypes, { holdingId: "", accountType: "新NISA口座" }];
      } else {
        types = [{ holdingId: "", accountType: "特定口座" }, ...defaultTypes];
      }
    }
    setAccountTypes(types);
  }, [isChecked, defaultTypes]);

  useEffect(() => {
    if (!isChecked) {
      reset({
        numberOfSharesHeld: [...defaultValues.numberOfSharesHeld],
        acquisitionPrice: [...defaultValues.acquisitionPrice],
      });
    } else {
      if (accountTypes[0] && accountTypes[0].accountType === specialAccount) {
        reset({
          numberOfSharesHeld: [...defaultValues.numberOfSharesHeld, 0],
          acquisitionPrice: [...defaultValues.acquisitionPrice, 0],
        });
      } else {
        reset({
          numberOfSharesHeld: [0, ...defaultValues.numberOfSharesHeld],
          acquisitionPrice: [0, ...defaultValues.acquisitionPrice],
        });
      }
    }
  }, [isChecked, reset, defaultValues]);
  const deleteAccountType = (index: number) => {
    const newAccountTypes = [...accountTypes];
    newAccountTypes.splice(index, 1);
    setAccountTypes(newAccountTypes);
    setIsChecked((prev) => !prev);
  };

  const handleDeleteDb = async (holdingId: string) => {
    await deleteJaStockClient(holdingId).then(() => {
      hideAlertDialog();
      router.refresh();
      router.back();
    });
  };

  const handleDelete = async (holdingId: string, index: number) => {
    if (holdingId) {
      showDeleteAlertDialog({
        message: "口座を削除しますか?",
        cancelButtonLabel: "いいえ",
        okButtonLabel: "削除",
      });
    } else {
      deleteAccountType(index);
    }
  };

  return {
    accountTypeAndHoldingIds: accountTypes,
    deleteAccountType,
    setIsChecked,
    handleDeleteDb,
    handleDelete,
  };
};

type UseManageJaAccountType = ReturnType<typeof useManageJaAccountTypes>;

export type AccountTypeAndHoldingIds =
  UseManageJaAccountType["accountTypeAndHoldingIds"];

export const useManageFgnAccountTypes = (
  defaultTypes: {
    holdingId: string;
    accountType: string;
  }[],
  reset: UseFormReset<UpdateFgnStockType>,
  defaultValues: UpdateFgnStockType
) => {
  const router = useRouter();
  const { isChecked, setIsChecked } = useCheck();
  const [accountTypes, setAccountTypes] = useState(defaultTypes);
  const { showDeleteAlertDialog, hideAlertDialog } = useAlertDialog();
  const specialAccount = "特定口座";

  useEffect(() => {
    let types = defaultTypes;
    if (isChecked) {
      if (defaultTypes[0].accountType === specialAccount) {
        types = [...defaultTypes, { holdingId: "", accountType: "新NISA口座" }];
      } else {
        types = [{ holdingId: "", accountType: "特定口座" }, ...defaultTypes];
      }
    }
    setAccountTypes(types);
  }, [isChecked, defaultTypes]);

  useEffect(() => {
    if (!isChecked) {
      reset({
        numberOfSharesHeld: [...defaultValues.numberOfSharesHeld],
        acquisitionPrice: [...defaultValues.acquisitionPrice],
      });
    } else {
      if (accountTypes[0] && accountTypes[0].accountType === specialAccount) {
        reset({
          numberOfSharesHeld: [...defaultValues.numberOfSharesHeld, 0],
          acquisitionPrice: [...defaultValues.acquisitionPrice, 0],
          acquisitionPriceJPY: [...defaultValues.acquisitionPriceJPY, 0],
        });
      } else {
        reset({
          numberOfSharesHeld: [0, ...defaultValues.numberOfSharesHeld],
          acquisitionPrice: [0, ...defaultValues.acquisitionPrice],
          acquisitionPriceJPY: [0, ...defaultValues.acquisitionPriceJPY],
        });
      }
    }
  }, [isChecked, reset, defaultValues]);
  const deleteAccountType = (index: number) => {
    const newAccountTypes = [...accountTypes];
    newAccountTypes.splice(index, 1);
    setAccountTypes(newAccountTypes);
    setIsChecked((prev) => !prev);
  };

  const handleDeleteDb = async (holdingId: string) => {
    // DB delete処理
    // await deleteJaStockClient(holdingId).then(() => {
    //   hideAlertDialog();
    //   router.refresh();
    //   router.back();
    // });
  };

  const handleDelete = async (holdingId: string, index: number) => {
    if (holdingId) {
      showDeleteAlertDialog({
        message: "口座を削除しますか?",
        cancelButtonLabel: "いいえ",
        okButtonLabel: "削除",
      });
    } else {
      deleteAccountType(index);
    }
  };

  return {
    accountTypeAndHoldingIds: accountTypes,
    deleteAccountType,
    setIsChecked,
    handleDeleteDb,
    handleDelete,
  };
};
