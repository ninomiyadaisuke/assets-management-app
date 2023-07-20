import { atom } from "jotai";

export const switchedUsdJpyRateContext = atom<"dollar" | "yen">("yen");
