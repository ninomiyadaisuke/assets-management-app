import { typedDelete } from "@/libs/fetchUtils";

export const deleteFgnStockClient = async (id: string) => {
  return typedDelete<string>(`/api/delete/fgn/${id}`);
};
