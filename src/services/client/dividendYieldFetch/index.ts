import { typedFetch } from "@/libs/fetchUtils";
import { url } from "@/services/client/url";
import { DividendYieldReturn } from "@/services/server/dividendYieldFetch";
export const fetchDividendYieldClient = async (
  uid: string,
  status: "評価額" | "配当額" | "景気敏感割合",
  currency: "yen" | "dollar" | "yenAndDollar"
) => {
  if (status === "評価額") return;
  const params = { q: uid, currency };
  const query = new URLSearchParams(params);

  return typedFetch<DividendYieldReturn>(`${url}/api/dividend-yield?${query}`, {
    cache: "force-cache",
  });
};
