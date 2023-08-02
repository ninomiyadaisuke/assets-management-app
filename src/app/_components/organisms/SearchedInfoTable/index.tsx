"use client";
import { FC } from "react";

import { SearchedInfo } from "../../atoms/SearchedInfo";

type Props = {
  unit: "＄" | "円";
};

const data = ["株価", "配当金", "配当利回り"];

export const SearchedInfoTable: FC<Props> = ({ unit }) => {
  const stockName = "日本電信電話";
  const latestStockPrice = 2000;
  const dividend = 4;
  const dividendYield = 4.1;
  const array = [latestStockPrice, dividend, dividendYield];
  return (
    <table className="w-full border px-3">
      <thead className="block border-b border-gray-200 bg-blue-50 py-3 text-center font-bold">
        {stockName}
      </thead>
      <tbody className="w-full">
        {data.map((data, i) => (
          <SearchedInfo
            key={i}
            title={data}
            value={array[i]}
            unit={data !== "配当利回り" ? unit : "%"}
          />
        ))}
      </tbody>
    </table>
  );
};
