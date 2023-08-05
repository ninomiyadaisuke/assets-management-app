import { typedPost } from "@/libs/fetchUtils";
import { CreateInputType } from "@/services/server/jaStockCreate";

export const createStockData = async (input: CreateInputType) => {
  return typedPost<CreateInputType>(`/api/create/ja`, input);
};
