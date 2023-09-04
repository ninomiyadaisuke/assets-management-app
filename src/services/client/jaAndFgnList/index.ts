import { typedFetch } from "@/libs/fetchUtils";
import { url } from "@/services/client/url";
import { JaAndFgnGraphListReturn } from "@/services/server/jaAndFgnList";

export const fetchJaAndFgnGraphListClient = async (
  uid: string,
  status: "評価額" | "配当額" | "景気敏感割合"
) => {
  const params = { q: uid, status };
  const query = new URLSearchParams(params);

  return typedFetch<JaAndFgnGraphListReturn>(
    `${url}/api/graph/ja-fgn/list?${query}`,
    { cache: "force-cache" }
  );
};
