import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { cache } from "react";

import { Database } from "@/libs/database.types";
import { UnauthorizedError } from "@/libs/error";
import { jaStockTotal } from "@/services/server/jaStockTotal";

export async function GET() {
  const createRouteHandlerClientCache = cache(() => {
    const cookieStore = cookies();
    return createRouteHandlerClient<Database>({ cookies: () => cookieStore });
  });
  const supabase = createRouteHandlerClientCache();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new UnauthorizedError();
  const uid = user.id;
  // return uid;
  const data = await jaStockTotal(uid);

  return NextResponse.json(data);
}
