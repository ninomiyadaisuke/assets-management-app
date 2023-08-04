import { NextResponse } from "next/server";

import { UnauthorizedError } from "@/libs/error";
import { createRouteHandlerClientCache } from "@/services/server";
import { jaStockTotal } from "@/services/server/jaStockTotal";

export async function GET() {
  const supabase = createRouteHandlerClientCache();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new UnauthorizedError();
  const uid = user.id;

  const data = await jaStockTotal(uid);

  return NextResponse.json(data);
}
