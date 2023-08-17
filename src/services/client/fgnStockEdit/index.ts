import { UpdateFgnStockInput } from "@/app/_components/templates/FgnStockEdit/FgnStockEditForm";
import { typedFetch, typedPatch, typedPost } from "@/libs/fetchUtils";
import { FgnStockReturn } from "@/services/server/fgnStockEdit";

import { url } from "../url";

export const fetchFgnStocksClient = async (uid: string, stockId: string) => {
  const params = { q: uid };
  const query = new URLSearchParams(params);
  return await typedFetch<FgnStockReturn>(
    `${url}/api/edit/fgn/${stockId}?${query}`,
    {}
  );
};

export const updateFgnStocksClient = async (
  input: UpdateFgnStockInput[],
  id: string
) => {
  return await typedPatch(`/api/edit/fgn/${id}`, input);
};

export const createAndUpdateFgnStocksClient = async (
  input: UpdateFgnStockInput[],
  id: string,
  uid: string
) => {
  const params = { q: uid };
  const query = new URLSearchParams(params);
  return await typedPost(`/api/edit/fgn/${id}?${query}`, input);
};
