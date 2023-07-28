"use client";
import cx from "classnames";
import { forwardRef } from "react";

import { returnThemePlusOrMinus } from "@/utils";

import { ValueDisplay } from "../ValueDisplay";

type Props = React.ComponentPropsWithRef<"tr"> & {
  title: string;
  value: number;
  unit: "円" | "%" | "株" | "＄";
};

export const StockInfo = forwardRef<HTMLTableRowElement, Props>(
  function StockInfoBase({ title, value, unit, className, ...props }, ref) {
    const theme = unit === "株" ? "default" : returnThemePlusOrMinus(value);
    return (
      <tr
        ref={ref}
        {...props}
        className={cx(
          className,
          "flex w-full border-t border-dashed border-gray-400 py-3"
        )}
      >
        <th className="flex-1 text-left text-sm">{title}</th>
        <td className="flex flex-1 items-center justify-end">
          <ValueDisplay theme={theme} variant="small" unit={unit}>
            {value}
          </ValueDisplay>
        </td>
      </tr>
    );
  }
);
