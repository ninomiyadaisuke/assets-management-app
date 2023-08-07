import { headers } from "next/headers";

import { typedFetch, typedPatch, typedPost } from "@/libs/fetchUtils";
import { url } from "@/services/client/url";
import { JaStockReturn } from "@/services/server/JaStockEdit";

export const fetchStockData = async (id: string) => {
  return await typedFetch<JaStockReturn>(`${url}/api/edit/ja/${id}`, {
    headers: {
      cookie: headers().get("cookie") as string,
    },
    cache: "no-store",
  });
};

export const updateStockData = async (input: any[], id: string) => {
  return await typedPatch(`/api/edit/ja/${id}`, input);
};

export const createStockData = async (input: any[], id: string) => {
  return await typedPost(`/api/edit/ja/${id}`, input);
};
