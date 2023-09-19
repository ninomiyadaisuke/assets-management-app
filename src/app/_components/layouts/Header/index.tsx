import { Prisma } from "@prisma/client";
import { FC } from "react";

import { Heading } from "./Heading";
import { Nav } from "./Nav";

type Props = {
  userMessagePromise: Prisma.PrismaPromise<
    {
      message: {
        content: string;
        messageId: string;
      };
      isRead: boolean;
      readAt: Date | null;
      messageId: string;
      userMessageId: string;
    }[]
  >;
};

export const Header: FC<Props> = ({ userMessagePromise }) => {
  return (
    <header className="fixed z-50 flex h-[50px] w-full items-center justify-between bg-primary px-4 md:w-[768px]">
      <Heading />
      <Nav userMessagePromise={userMessagePromise} />
    </header>
  );
};
