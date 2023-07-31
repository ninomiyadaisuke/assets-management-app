"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DialogWrapper: FC<Props> = ({ children }) => {
  const router = useRouter();

  return (
    <Dialog.Root
      defaultOpen={true}
      onOpenChange={() => {
        router.back();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 grid place-items-center overflow-y-auto bg-blackA9 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-[50%] top-[50%] w-[90vw]  max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogWrapper;
