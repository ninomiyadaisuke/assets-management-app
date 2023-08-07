import { useEffect, useState } from "react";
import { UseFormReset } from "react-hook-form";

import { UpdateStockType } from "@/libs/schema/createStock";

import { useCheck } from "./useCheck";

export const useManageJaAccountTypes = (
  defaultTypes: {
    holdingId: string;
    accountType: string;
  }[],
  reset: UseFormReset<UpdateStockType>,
  defaultValues: UpdateStockType
) => {
  const { isChecked, setIsChecked } = useCheck();
  const [accountTypes, setAccountTypes] = useState(defaultTypes);

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

  return {
    accountTypeAndHoldingIds: accountTypes,
    deleteAccountType,
    setIsChecked,
  };
};
