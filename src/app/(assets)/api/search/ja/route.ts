import { NextResponse } from "next/server";

import { searchInputSchema } from "@/libs/schema/searchStock";
import { searchStock } from "@/services/server/serchStock";

export async function POST(request: Request) {
  const { code } = searchInputSchema.parse(await request.json());
  const data = await searchStock(code);
  return NextResponse.json(data);
}
