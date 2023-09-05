import { typedFetch } from "@/libs/fetchUtils";
import { url } from "@/services/client/url";
import { JaGraphListReturn } from "@/services/server/jaGraphList";

export const fetchJaGraphListClient = async (
  uid: string,
  status: "評価額" | "配当額" | "景気敏感割合"
) => {
  const params = { q: uid, status };
  const query = new URLSearchParams(params);

  return typedFetch<JaGraphListReturn>(`${url}/api/graph/ja/list?${query}`, {});
};
