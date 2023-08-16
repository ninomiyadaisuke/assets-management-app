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

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("q");
  if (!uid) throw new UnauthorizedError();
  return NextResponse.json({});
}

export async function PATCH(request: Request) {
  return NextResponse.json({});
}
