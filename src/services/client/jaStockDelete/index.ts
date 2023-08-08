import { typedDelete } from "@/libs/fetchUtils";

export const deleteJaStockClient = async (id: string) => {
  return typedDelete<string>(`/api/delete/ja/${id}`);
};
