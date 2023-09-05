import { typedFetch } from "@/libs/fetchUtils";
import { url } from "@/services/client/url";

export const fetchJaTotalHoldingCountClient = async (
  uid: string,
  marketType: "日本株" | "外国株"
) => {
  const params = { q: uid, marketType };
  const query = new URLSearchParams(params);
  return typedFetch<number>(`${url}/api/holdings/total-count?${query}`, {});
};
