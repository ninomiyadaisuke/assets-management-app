import { NextResponse } from "next/server";

import { UnauthorizedError } from "@/libs/error";
import { fetchJaGraphListServer } from "@/services/server/jaGraphList";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("q");
  const status = searchParams.get("status");
  if (!uid) throw new UnauthorizedError();
  const promiseData = (() => {
    switch (status) {
      case "評価額":
        return fetchJaGraphListServer(uid);
      case "配当額":
        return;
      case "景気敏感割合":
        return;
    }
  })();
  const data = await promiseData;
  return NextResponse.json(data);
}
