import { FC } from "react";

import { Heading } from "./Heading";
import { Nav } from "./Nav";

export const Header: FC = () => {
  return (
    <header className="flex h-[50px] w-full items-center justify-between bg-primary px-4">
      <Heading />
      <Nav />
    </header>
  );
};
