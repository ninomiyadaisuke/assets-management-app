import { typedPost } from "@/libs/fetchUtils";
import { CreateInputType } from "@/services/server/jaStockCreate";

export const createStockData = async (input: CreateInputType) => {
  // console.log(input);

  return typedPost<CreateInputType>(`/api/create/ja`, input);
};
