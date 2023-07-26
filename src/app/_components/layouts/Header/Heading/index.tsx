import Link from "next/link";
import { FC } from "react";

export const Heading: FC = () => {
  return (
    <h1 className="text-lg">
      <Link href={"/"} className="font-bold text-white">
        資産管理アプリ
      </Link>
    </h1>
  );
};
