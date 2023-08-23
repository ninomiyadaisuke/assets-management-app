import { typedFetch } from "@/libs/fetchUtils";

import { url } from "../url";

export const fetchJaAndFgnGraphClient = async (
  uid: string,
  status: "評価額" | "配当額" | "景気敏感割合"
) => {
  const params = { q: uid, status };
  const query = new URLSearchParams(params);

  return typedFetch<any>(`${url}/api/graph/ja-fgn?${query}`, {});
};
