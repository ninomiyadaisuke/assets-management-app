import { NextResponse } from "next/server";

import { UpdateFgnStockInput } from "@/app/_components/templates/FgnStockEdit/FgnStockEditForm";
import { UnauthorizedError } from "@/libs/error";
import {
  createAndUpdateFgnStocksServer,
  fetchFgnStocksServer,
  updateFgnStocksServer,
} from "@/services/server/fgnStockEdit";

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
  const stockId = params.id;
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("q");
  if (!uid) throw new UnauthorizedError();
  const input: UpdateFgnStockInput[] = await request.json();
  const data = await createAndUpdateFgnStocksServer(input, stockId, uid);
  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const input: UpdateFgnStockInput[] = await request.json();
  const data = await updateFgnStocksServer(input);
  return NextResponse.json(data);
}
