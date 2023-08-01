import { useAtom } from "jotai";
import { MouseEvent } from "react";

import { AssetType, assetTypeContext } from "@/contexts/assetTypeContext";

export const useAssetType = () => {
  const [assetType, setAssetType] = useAtom(assetTypeContext);

  const getAccountTypes = () => {
    const specialAccount = "特定口座";
    const nisaAccount = "新NISA口座";
    if (assetType === specialAccount) return [specialAccount];
    if (assetType === nisaAccount) return [nisaAccount];
    return [specialAccount, nisaAccount];
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value as AssetType;
    if (["特定口座", "新NISA口座", "両方"].includes(value)) {
      setAssetType(value);
    } else {
      throw new Error("エラーです。");
    }
  };

  return { assetType, setAssetType, getAccountTypes, handleClick };
};
