import { headers } from "next/headers";

import { typedFetch } from "@/libs/fetchUtils";
import type { JaStockTotalReturn } from "@/services/server/jaStockTotal";

const URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL
    : `https://${process.env.VERCEL_URL}.vercel.app`;

export const getJaStocksTotal = async () => {
  return typedFetch<JaStockTotalReturn>(`${URL}/api/stocks/ja/total`, {
    headers: {
      cookie: headers().get("cookie") as string,
    },
    cache: "no-store",
  });
};
