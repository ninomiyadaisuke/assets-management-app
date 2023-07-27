import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const CardWrapper: FC<Props> = ({ children }) => {
  return (
    <div className="h-auto w-full rounded-lg bg-card shadow ">{children}</div>
  );
};
