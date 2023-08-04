import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { cache } from "react";

import { Database } from "@/libs/database.types";
import { UnauthorizedError } from "@/libs/error";
import { jaStockTotal } from "@/services/server/jaStockTotal";

const createRouteHandlerClientCache = cache(() => {
  const cookieStore = cookies();
  return createRouteHandlerClient<Database>({ cookies: () => cookieStore });
});

export async function GET() {
  try {
    const supabase = createRouteHandlerClientCache();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new UnauthorizedError();
    const uid = user.id;
    const data = await jaStockTotal(uid);
    return NextResponse.json(data);
    // return uid;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw error;
    }
  }
}
