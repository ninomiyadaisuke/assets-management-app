import { NextResponse } from "next/server";

import { authValidateAndReturnUid } from "@/services/server/auth";
import { jaStockTotal } from "@/services/server/jaStockTotal";

export async function GET() {
  const uid = await authValidateAndReturnUid();
  const data = await jaStockTotal(uid);

  return NextResponse.json(data);
}
