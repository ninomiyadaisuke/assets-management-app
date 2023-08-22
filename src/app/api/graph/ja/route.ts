import { NextResponse } from "next/server";

import { UnauthorizedError } from "@/libs/error";
import { fetchJaGraphTotalServer } from "@/services/server/jaGraphFetch";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("q");
  const status = searchParams.get("status");

  if (!uid) throw new UnauthorizedError();

  // const promiseData = (() => {
  //   switch (status) {
  //     case "評価額":
  //       return fetchJaGraphTotalServer(uid);
  //     case "配当額":
  //       return;
  //     case "景気敏感割合":
  //       return;
  //   }
  // })();
  // const data = await promiseData;

  const data = await fetchJaGraphTotalServer(uid);

  return NextResponse.json(data);
}
