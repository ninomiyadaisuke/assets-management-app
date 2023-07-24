import React, { FC } from "react";

type Props = {
  variant?: "small" | "default";
} & React.ComponentPropsWithoutRef<"span">;

export const Spinner: FC<Props> = ({ variant = "default" }) => {
  return (
    <div className="flex justify-center" aria-label="読み込み中">
      <span
        className="h-9 w-9  animate-spin rounded-full border-4 border-red-400 border-t-transparent data-[variant=default]:h-9 data-[variant=small]:h-6 data-[variant=default]:w-9 data-[variant=small]:w-6"
        data-variant={variant}
      />
    </div>
  );
};
