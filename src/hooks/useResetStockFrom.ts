import { useEffect } from "react";
import { UseFormReset } from "react-hook-form";

import { useAssetType } from "@/hooks/useAssetType";
import { CreateStockType } from "@/libs/schema/createStock";

export const useResetStockFrom = (
  defaultValues: CreateStockType,
  reset: UseFormReset<CreateStockType>
) => {
  const { assetType, setAssetType } = useAssetType();
  useEffect(() => {
    if (assetType !== "両方") return;
    reset({
      numberOfSharesHeld: [...defaultValues.numberOfSharesHeld, ""],
      acquisitionPrice: [...defaultValues.acquisitionPrice, ""],
    });
  }, [assetType]);
};
