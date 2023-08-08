import { NextResponse } from "next/server";

import { deleteJaStockServer } from "@/services/server/jaStockDelete";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await deleteJaStockServer(id);
  return NextResponse.json(data);
}
