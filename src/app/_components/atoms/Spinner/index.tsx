import React, { FC } from "react";

export const Spinner: FC = () => {
  return (
    <div className="flex justify-center" aria-label="読み込み中">
      <span className="animate-spin h-9 w-9 border-4 border-red-400 rounded-full border-t-transparent" />
    </div>
  );
};
