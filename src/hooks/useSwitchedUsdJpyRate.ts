import { useAtom } from "jotai";

import { switchedUsdJpyRateContext } from "@/contexts/switchedUsdJpyRateContext";

export const useSwitchedUsdJpyRate = () => {
  const [switchedUsdJpyRate, setSwitchedUsdJpyRate] = useAtom(
    switchedUsdJpyRateContext
  );

  return {
    switchedUsdJpyRate,
    setSwitchedUsdJpyRate,
  };
};
