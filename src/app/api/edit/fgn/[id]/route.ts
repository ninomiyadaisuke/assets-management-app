import { NextResponse } from "next/server";

import { UnauthorizedError } from "@/libs/error";
import { fetchFgnStocksServer } from "@/services/server/fgnStockEdit";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const stockId = params.id;
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("q");
  if (!uid) throw new UnauthorizedError();
  const data = await fetchFgnStocksServer(uid, stockId);

  return NextResponse.json(data);
}
