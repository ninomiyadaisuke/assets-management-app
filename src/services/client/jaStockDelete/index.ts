import { typedDelete } from "@/libs/fetchUtils";

export const deleteStockClient = async (id: string) => {
  return typedDelete<string>(`/api/delete/ja/${id}`);
};
