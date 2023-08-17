import { NextResponse } from "next/server";

import { deleteFgnStockServer } from "@/services/server/fgnStockDelete";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await deleteFgnStockServer(id);
  return NextResponse.json(data);
}
