import { NextResponse } from "next/server";

import { fetchJaTotalHoldingCountServer } from "@/services/server/totalHoldingCount";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { slug: string };
  }
) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("q");
  const data = await fetchJaTotalHoldingCountServer(uid, "日本株");
  return NextResponse.json(data);
}
