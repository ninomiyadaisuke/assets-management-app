import { typedFetch } from "@/libs/fetchUtils";
import { url } from "@/services/client/url";

export const fetchJaTotalHoldingCountClient = async (
  uid: string,
  country: "ja" | "foreign"
) => {
  const params = { q: uid };
  const query = new URLSearchParams(params);
  return typedFetch<number>(
    `${url}/api/holdings/total-count/${country}?${query}`,
    {
      cache: "force-cache",
    }
  );
};
