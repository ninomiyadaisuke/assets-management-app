import { NextResponse } from "next/server";

import { fetchDollarFgnStocksTotalServer } from "@/services/server/fgnStocksTotal";

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
  const data = await fetchDollarFgnStocksTotalServer(uid);

  return NextResponse.json(data);
}
