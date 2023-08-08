"use client";
import { FC } from "react";

import { Button } from "@/app/_components/atoms/Button";
import { AlertDialog } from "@/app/_components/organisms/AlertDialog";
import { AlertDialogState } from "@/contexts/alertDialogContext";
import { useAlertDialog } from "@/hooks/useAlertDialog";

type Props = {
  isSubmitting: boolean;
  alertDialogState: Partial<AlertDialogState>;
};

export const ConfirmSubmitButton: FC<Props> = ({
  isSubmitting,
  alertDialogState,
}) => {
  const { showAlertDialog, isDelete } = useAlertDialog();
  return (
    <>
      <Button
        disabled={isSubmitting}
        type="button"
        onClick={() => showAlertDialog(alertDialogState)}
      >
        送信
      </Button>
      {!isDelete && (
        <AlertDialog
          buttonComponent={(label) => (
            <Button disabled={isSubmitting} type="submit">
              {label}
            </Button>
          )}
        />
      )}
    </>
  );
};
