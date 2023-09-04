import { NextResponse } from "next/server";

import { jaStockTotal } from "@/services/server/jaStockTotal";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("q");

  const data = await jaStockTotal(uid);

  return NextResponse.json(data);
}
