import { NextResponse } from "next/server";

import { UnauthorizedError } from "@/libs/error";
import { createRouteHandlerClientCache } from "@/services/server";
import { CreateInputType, createStock } from "@/services/server/jaStockCreate";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClientCache();
  const input: CreateInputType = await request.json();

  // console.log(input);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new UnauthorizedError();
  const uid = user.id;
  const result = await createStock(input, uid);
  return NextResponse.json({ success: true, result: result });
}
