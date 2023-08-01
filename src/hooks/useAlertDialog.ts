import { useAtom } from "jotai";
import { useCallback } from "react";

import {
  AlertDialogState,
  alertDialogStateContext,
} from "@/contexts/alertDialogContext";

export const useAlertDialog = () => {
  const [state, setState] = useAtom(alertDialogStateContext);
  const showAlertDialog = useCallback(
    (props?: Partial<Omit<AlertDialogState, "isShown">>) => {
      setState((prev) => ({ ...prev, ...props, isShown: true }));
    },
    []
  );
  const hideAlertDialog = useCallback(() => {
    setState((prev) => ({ ...prev, isShown: false }));
  }, []);

  return {
    ...state,
    showAlertDialog,
    hideAlertDialog,
  };
};
