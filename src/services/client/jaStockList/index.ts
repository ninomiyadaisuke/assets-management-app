import { headers } from "next/headers";

import { typedFetch } from "@/libs/fetchUtils";
import { url } from "@/services/client/url";
import type { JaStockListReturn } from "@/services/server/jaStockList";

export const fetchStockList = async () => {
  return typedFetch<JaStockListReturn>(`${url}/api/stocks/ja/list`, {
    headers: {
      cookie: headers().get("cookie") as string,
    },
    cache: "no-store",
  });
};
