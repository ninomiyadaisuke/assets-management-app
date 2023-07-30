import { useAtom } from "jotai";

import { addAccountContext } from "@/contexts/addAccountContext";

export const useIsAddAccount = () => {
  const [isAddAccount, setIsAddAccount] = useAtom(addAccountContext);
  return {
    isAddAccount,
    setIsAddAccount,
  };
};
