import { NextResponse } from "next/server";

import { UnauthorizedError } from "@/libs/error";
import { createRouteHandlerClientCache } from "@/services/server";
import { jaStockList } from "@/services/server/jaStockList";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("q");
  if (!uid) throw new UnauthorizedError();

  const data = await jaStockList(uid);

  return NextResponse.json(data);
}
