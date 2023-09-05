import { typedFetch } from "@/libs/fetchUtils";
import { url } from "@/services/client/url";
import { FgnGraphListReturn } from "@/services/server/fgnGraphList";

export const fetchFgnGraphListClient = async (
  uid: string,
  status: "評価額" | "配当額" | "景気敏感割合"
) => {
  const params = { q: uid, status };
  const query = new URLSearchParams(params);

  return typedFetch<FgnGraphListReturn>(
    `${url}/api/graph/fgn/list?${query}`,
    {}
  );
};
