import { NextResponse } from "next/server";

import { MessageReadStatus } from "@/app/_components/molecules/NotificationDropMenu";
import { readMessagesServer } from "@/services/server/readMessages";

export async function PATCH(request: Request) {
  const messages: MessageReadStatus[] = await request.json();
  const data = await readMessagesServer(messages);
  return NextResponse.json(data);
}
