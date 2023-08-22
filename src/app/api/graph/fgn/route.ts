import { NextResponse } from "next/server";

import { UnauthorizedError } from "@/libs/error";
import {
  fetchFgnGraphCalculateIndustryRatiosServer,
  fetchFgnGraphDividendServer,
  fetchFgnGraphTotalServer,
} from "@/services/server/fgnGraphFetch";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("q");
  const status = searchParams.get("status");

  if (!uid) throw new UnauthorizedError();

  const promiseData = (() => {
    switch (status) {
      case "評価額":
        return fetchFgnGraphTotalServer(uid);
      case "配当額":
        return fetchFgnGraphDividendServer(uid);
      case "景気敏感割合":
        return fetchFgnGraphCalculateIndustryRatiosServer(uid);
    }
  })();
  const data = await promiseData;

  return NextResponse.json(data);
}
