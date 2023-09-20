import { NextResponse } from "next/server";

import { fetchNotificationServer } from "@/services/server/notificationFetch";

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
  const data = await fetchNotificationServer(uid);

  return NextResponse.json(data);
}
