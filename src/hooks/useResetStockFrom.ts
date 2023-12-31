import { useEffect } from "react";
import { UseFormReset } from "react-hook-form";

import { useAssetType } from "@/hooks/useAssetType";
import { CreateFgnStockType } from "@/libs/schema/createFgnStock";
import { CreateStockType } from "@/libs/schema/createStock";

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

export const useResetFgnStockFrom = (
  defaultValues: CreateFgnStockType,
  reset: UseFormReset<CreateFgnStockType>
) => {
  const { assetType } = useAssetType();
  useEffect(() => {
    if (assetType !== "両方") return;
    reset({
      numberOfSharesHeld: [...defaultValues.numberOfSharesHeld, 0],
      acquisitionPrice: [...defaultValues.acquisitionPrice, 0],
      acquisitionPriceJPY: [...defaultValues.acquisitionPriceJPY, 0],
    });
  }, [assetType]);
};
