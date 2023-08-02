"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react";

import { useStockStatus } from "@/hooks/useStockStatus";

type Props = {
  children: ReactNode;
};

const DialogWrapper: FC<Props> = ({ children }) => {
  const router = useRouter();
  const { resetStockStatus } = useStockStatus();

  return (
    <Dialog.Root
      defaultOpen={true}
      onOpenChange={() => {
        resetStockStatus();
        router.back();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-blackA9 ">
          <Dialog.Content className="w-[85vw]  max-w-[700px]  rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            {children}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogWrapper;
