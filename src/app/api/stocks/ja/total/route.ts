import { NextResponse } from "next/server";

import { jaStockTotal } from "@/services/server/jaStockTotal";

export async function GET() {
  const data = await jaStockTotal();

  return NextResponse.json(data);
}
