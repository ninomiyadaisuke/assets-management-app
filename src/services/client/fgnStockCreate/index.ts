import { typedPost } from "@/libs/fetchUtils";
import { CreateFgnInputType } from "@/services/server/fgnStockCreate";

export const createFgnStockClient = async (data: CreateFgnInputType) => {
  return typedPost<CreateFgnInputType>(`/api/create/fgn`, data);
};
