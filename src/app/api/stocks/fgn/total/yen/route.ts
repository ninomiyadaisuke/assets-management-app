import { NextResponse } from "next/server";

import { fetchYenFgnStocksTotalServer } from "@/services/server/fgnStocksTotal";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { slug: string };
  }
) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("q");
  const data = await fetchYenFgnStocksTotalServer(uid);

  return NextResponse.json(data);
}
