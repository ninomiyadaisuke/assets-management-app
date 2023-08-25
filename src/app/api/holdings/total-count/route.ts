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
  const marketType = searchParams.get("marketType") as "日本株" | "外国株";
  const data = await fetchJaTotalHoldingCountServer(uid, marketType);
  return NextResponse.json(data);
}
