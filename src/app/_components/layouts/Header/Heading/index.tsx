import Link from "next/link";
import { FC } from "react";

export const Heading: FC = () => {
  return (
    <h1>
      <Link href={"/"} className=" font-semibold text-white">
        資産管理アプリ
      </Link>
    </h1>
  );
};
