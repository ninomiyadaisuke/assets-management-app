import { NextResponse } from "next/server";

import { UnauthorizedError } from "@/libs/error";
import {
  fetchJaAndFgnGraphDividendServer,
  fetchJaAndFgnGraphTotalServer,
} from "@/services/server/jaAndFgnFetch";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("q");
  const status = searchParams.get("status");

  if (!uid) throw new UnauthorizedError();

  const promiseData = (() => {
    switch (status) {
      case "評価額":
        return fetchJaAndFgnGraphTotalServer(uid);
      case "配当額":
        return fetchJaAndFgnGraphDividendServer(uid);
    }
  })();
  const data = await promiseData;

  return NextResponse.json({});
}
