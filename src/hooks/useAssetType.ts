import { useAtom } from "jotai";

import { assetTypeContext } from "@/contexts/assetTypeContext";

export const useAssetType = () => {
  const [assetType, setAssetType] = useAtom(assetTypeContext);

  return { assetType, setAssetType };
};
