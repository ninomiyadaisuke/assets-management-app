import { NextResponse } from "next/server";

import { fetchDollarFgnListServer } from "@/services/server/fgnStockList";

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

  const data = await fetchDollarFgnListServer(uid);

  return NextResponse.json({});
}
