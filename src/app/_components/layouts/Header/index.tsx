import { FC } from "react";

import { Heading } from "./Heading";
import { Nav } from "./Nav";

export const Header: FC = () => {
  return (
    <header className="fixed z-50 flex h-[50px] w-full items-center justify-between bg-primary px-4 md:w-[768px]">
      <Heading />
      <Nav />
    </header>
  );
};
