import { NextResponse } from "next/server";

import {
  CreateFgnInputType,
  createFgnStockServer,
} from "@/services/server/fgnStockCreate";

export async function POST(request: Request) {
  const data: CreateFgnInputType = await request.json();
  const result = await createFgnStockServer(data);
  return NextResponse.json(result);
}
