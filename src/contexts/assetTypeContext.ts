import { atom } from "jotai";

export type AssetType = "特定口座" | "新NISA口座" | "両方";

export const assetTypeContext = atom<AssetType>("特定口座");
