import { NextResponse } from "next/server";

import { UnauthorizedError } from "@/libs/error";
import { fetchYenDividendYieldServer } from "@/services/server/jaDividendYieldFetch";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("q");
  const currency = searchParams.get("currency");
  if (!uid) throw new UnauthorizedError();

  const promiseData = (() => {
    switch (currency) {
      case "yen":
        return fetchYenDividendYieldServer(uid);
      case "dollar":
        return;
      case "yenAndDollar":
        return;
    }
  })();
  const data = await promiseData;
  return NextResponse.json({});
}
