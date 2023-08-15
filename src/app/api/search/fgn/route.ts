import { NextResponse } from "next/server";

import { searchInputSchema } from "@/libs/schema/searchStock";
import { searchFgnStock } from "@/services/server/serchStock";

export async function POST(request: Request) {
  const { code } = searchInputSchema.parse(await request.json());
  const data = await searchFgnStock(code);
  return NextResponse.json(data);
}
