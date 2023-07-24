import { FC } from "react";

import { IconButton } from "@/app/_components/atoms/IconButton";

const themes = ["update", "logout"];

export const Nav: FC = () => {
  return (
    <nav>
      <ul className="flex gap-5">
        {themes.map((theme) => (
          <li className="flex" key={theme}>
            <IconButton theme={theme as "update" | "logout"} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
