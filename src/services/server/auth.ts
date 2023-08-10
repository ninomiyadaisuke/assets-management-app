import {
  createRouteHandlerClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";

import { Database } from "@/libs/database.types";
import { InternalServerError, UnauthorizedError } from "@/libs/error";

export const createRouteHandlerClientCache = cache(() => {
  const cookieStore = cookies();
  return createRouteHandlerClient<Database>({ cookies: () => cookieStore });
});

export const createServerComponentClientCache = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
});

export const authValidateAndReturnUid = async (): Promise<string> => {
  try {
    const supabase = createRouteHandlerClientCache();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new UnauthorizedError();
    const uid = user.id;
    return uid;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw error;
    }
  }
  throw new InternalServerError();
};
