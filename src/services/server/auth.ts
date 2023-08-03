import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";

import { Database } from "@/libs/database.types";
import { InternalServerError, UnauthorizedError } from "@/libs/error";

const createRouteHandlerClientCache = cache(() => {
  const cookieStore = cookies();
  return createRouteHandlerClient<Database>({ cookies: () => cookieStore });
});

export const authValidateAndReturnUid = async (): Promise<string> => {
  try {
    const supabase = createRouteHandlerClientCache();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) throw new UnauthorizedError();
    const uid = session.user.id;
    return uid;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw error;
    }
  }
  throw new InternalServerError();
};
