import { typedPost } from "@/libs/fetchUtils";
import type {
  FgnSearchReturn,
  SearchReturn,
} from "@/services/server/serchStock";

export const searchStockData = async (code: { code: string }) => {
  return typedPost<SearchReturn>(`/api/search/ja`, code);
};

export const searchFgnStockClient = async (code: { code: string }) => {
  return typedPost<FgnSearchReturn>(`/api/search/fgn`, code);
};
