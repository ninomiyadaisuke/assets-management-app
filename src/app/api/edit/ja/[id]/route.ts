import { NextResponse } from "next/server";

import { UnauthorizedError } from "@/libs/error";
import { createRouteHandlerClientCache } from "@/services/server";
import { CreateInputType, createStock } from "@/services/server/jaStockCreate";
import { jaFetchStock } from "@/services/server/JaStockEdit";

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
  const input = await request.json();
  return NextResponse.json({});
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClientCache();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new UnauthorizedError();
  const uid = user.id;
  const input = await request.json();
  return NextResponse.json({});
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
  // console.log('==================================>>>>>>>',data);

  return NextResponse.json(data);
}
