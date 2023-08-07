import { NextResponse } from "next/server";

import { UpdateJaStockInput } from "@/app/_components/templates/JaStockEdit/JaStockEditForm";
import { UnauthorizedError } from "@/libs/error";
import { createRouteHandlerClientCache } from "@/services/server";
import {
  jaCreateStocks,
  jaFetchStock,
  jaUpdateStocks,
} from "@/services/server/JaStockEdit";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClientCache();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new UnauthorizedError();
  const uid = user.id;
  const stockId = params.id;
  const input: UpdateJaStockInput[] = await request.json();
  const data = await jaCreateStocks(input, stockId, uid);
  return NextResponse.json({ data });
}

export async function PATCH(request: Request) {
  const supabase = createRouteHandlerClientCache();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new UnauthorizedError();
  const input: UpdateJaStockInput[] = await request.json();
  const data = await jaUpdateStocks(input);
  return NextResponse.json(data);
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const stockId = params.id;
  const supabase = createRouteHandlerClientCache();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new UnauthorizedError();
  const uid = user.id;
  const data = await jaFetchStock(uid, stockId);

  return NextResponse.json(data);
}
