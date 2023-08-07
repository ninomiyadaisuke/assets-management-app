import { useAtom } from "jotai";

import { checkContext } from "@/contexts/checkContext";

export const useCheck = () => {
  const [isChecked, setIsChecked] = useAtom(checkContext);
  return {
    isChecked,
    setIsChecked,
  };
};
