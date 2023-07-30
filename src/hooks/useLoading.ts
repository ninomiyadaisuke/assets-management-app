import { useAtom } from "jotai";

import { loadingContext } from "@/contexts/loadingContext";

export const useLoading = () => {
  const [isLoading, setIsLoading] = useAtom(loadingContext);
  return {
    isLoading,
    setIsLoading,
  };
};
