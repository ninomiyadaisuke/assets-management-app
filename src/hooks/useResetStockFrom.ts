import { useEffect } from "react";
import { UseFormReset } from "react-hook-form";

import { useAssetType } from "@/hooks/useAssetType";
import { CreateStockType } from "@/libs/schema/updateStock";

export const useResetStockFrom = (
  defaultValues: CreateStockType,
  reset: UseFormReset<CreateStockType>
) => {
  const { assetType } = useAssetType();
  useEffect(() => {
    if (assetType !== "両方") return;
    reset({
      numberOfSharesHeld: [...defaultValues.numberOfSharesHeld, 0],
      acquisitionPrice: [...defaultValues.acquisitionPrice, 0],
    });
  }, [assetType]);
};
