import { typedFetch } from "@/libs/fetchUtils";
import { url } from "@/services/client/url";
import { JaGraphTotalReturn } from "@/services/server/jaGraphFetch";

export const fetchFgnGraphClient = async (
  uid: string,
  status: "評価額" | "配当額" | "景気敏感割合"
) => {
  const params = { q: uid, status };
  const query = new URLSearchParams(params);

  return typedFetch<JaGraphTotalReturn>(`${url}/api/graph/fgn?${query}`, {});
};
