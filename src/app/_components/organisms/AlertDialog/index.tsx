"use client";
import * as RadixAlertDialog from "@radix-ui/react-alert-dialog";
import { FC, ReactElement, useState } from "react";

import type { ButtonType } from "@/app/_components/atoms/Button";
import { Button } from "@/app/_components/atoms/Button";
import { useAlertDialog } from "@/hooks/useAlertDialog";

type Props = {
  buttonComponent: (label: string) => ReactElement<ButtonType>;
};

export const AlertDialog: FC<Props> = ({ buttonComponent }) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const {
    hideAlertDialog,
    isShown,
    message,
    okButtonLabel,
    cancelButtonLabel,
  } = useAlertDialog();

  if (!isShown) return;
  return (
    <div>
      <RadixAlertDialog.Root defaultOpen={true}>
        <RadixAlertDialog.Portal container={container}>
          <RadixAlertDialog.Overlay className="fixed inset-0 z-[101] bg-blackA9 data-[state=open]:animate-overlayShow" />
          <RadixAlertDialog.Content className="fixed left-[50%] top-[50%] z-[102] flex max-h-[85vh] w-[90vw] max-w-[400px] translate-x-[-50%] translate-y-[-50%] flex-col gap-5 rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
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
              <div className="w-32">{buttonComponent(okButtonLabel)}</div>
            </div>
          </RadixAlertDialog.Content>
        </RadixAlertDialog.Portal>
      </RadixAlertDialog.Root>
      <div ref={setContainer} />
    </div>
  );
};
