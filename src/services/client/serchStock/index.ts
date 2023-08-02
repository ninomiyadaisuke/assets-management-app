import { typedPost } from "@/libs/fetchUtils";
import type { SearchReturn } from "@/services/server/serchStock";

export const searchStockData = async (code: { code: string }) => {
  return typedPost<SearchReturn>(`/api/search/ja`, code);
};
