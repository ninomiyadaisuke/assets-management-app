"use client";
import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { FC } from "react";

import { Button } from "@/app/_components/atoms/Button";
import { useAlertDialog } from "@/hooks/useAlertDialog";

export const AlertDialog: FC = () => {
  const {
    hideAlertDialog,
    isShown,
    message,
    okButtonLabel,
    cancelButtonLabel,
  } = useAlertDialog();
  if (!isShown) return;
  return (
    <RadixAlertDialog.Root defaultOpen={true}>
      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay className="fixed inset-0 bg-blackA9 data-[state=open]:animate-overlayShow" />
        <RadixAlertDialog.Content className="fixed left-[50%] top-[50%] flex max-h-[85vh] w-[90vw] max-w-[400px] translate-x-[-50%] translate-y-[-50%] flex-col gap-5 rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <RadixAlertDialog.Title className="text-center">
            {message}
          </RadixAlertDialog.Title>
          <div className="flex justify-center gap-[24px]">
            <RadixAlertDialog.Cancel asChild>
              <div className="w-32">
                <Button theme="outline" onClick={hideAlertDialog}>
                  {cancelButtonLabel}
                </Button>
              </div>
            </RadixAlertDialog.Cancel>
            <RadixAlertDialog.Action asChild>
              <div className="w-32">
                <Button theme="error">{okButtonLabel}</Button>
              </div>
            </RadixAlertDialog.Action>
          </div>
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  );
};
