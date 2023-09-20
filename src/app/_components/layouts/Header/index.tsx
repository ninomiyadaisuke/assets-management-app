import { FC } from "react";

import { NotificationPromise } from "@/services/server/notificationFetch";

import { Heading } from "./Heading";
import { Nav } from "./Nav";

type Props = {
  userMessagePromise: NotificationPromise;
};

export const Header: FC<Props> = ({ userMessagePromise }) => {
  return (
    <header className="fixed z-50 flex h-[50px] w-full items-center justify-between bg-primary px-4 md:w-[768px]">
      <Heading />
      <Nav userMessagePromise={userMessagePromise} />
    </header>
  );
};
