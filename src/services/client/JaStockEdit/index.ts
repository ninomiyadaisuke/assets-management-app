import { UpdateJaStockInput } from "@/app/_components/templates/JaStockEdit/JaStockEditForm";
import { typedFetch, typedPatch, typedPost } from "@/libs/fetchUtils";
import { url } from "@/services/client/url";
import { JaStockReturn } from "@/services/server/JaStockEdit";

export const fetchStockData = async (id: string) => {
  const { headers } = await import("next/headers");
  return await typedFetch<JaStockReturn>(`${url}/api/edit/ja/${id}`, {
    headers: {
      cookie: headers().get("cookie") as string,
    },
    cache: "no-store",
  });
};

export const updateStockData = async (
  input: UpdateJaStockInput[],
  id: string
) => {
  return await typedPatch(`/api/edit/ja/${id}`, input);
};

export const createStockData = async (
  input: UpdateJaStockInput[],
  id: string
) => {
  return await typedPost(`/api/edit/ja/${id}`, input);
};
