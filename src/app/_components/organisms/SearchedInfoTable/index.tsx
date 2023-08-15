"use client";
import { FC } from "react";

import { useStockStatus } from "@/hooks/useStockStatus";

import { SearchedInfo } from "../../atoms/SearchedInfo";
import { Spinner } from "../../atoms/Spinner";

type Props = {
  unit: "＄" | "円";
};

const data = ["株価", "配当金", "配当利回り"];

export const SearchedInfoTable: FC<Props> = ({ unit }) => {
  const { stockName, latestStockPrice, dividend, dividendYield } =
    useStockStatus();
  if (!stockName) return null;
  const array = [latestStockPrice, dividend, dividendYield];
  return (
    <table className="w-full border px-3">
      <thead className="block border-b border-gray-200 bg-blue-50 p-3 font-bold">
        <tr>
          <th>{stockName}</th>
        </tr>
      </thead>
      <tbody className="w-full">
        {data.map((data, i) => {
          return (
            <SearchedInfo
              key={i}
              title={data}
              value={array[i]}
              unit={data !== "配当利回り" ? unit : "%"}
            />
          );
        })}
      </tbody>
    </table>
  );
};
