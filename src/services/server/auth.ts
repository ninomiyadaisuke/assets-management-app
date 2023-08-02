import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { InternalServerError, UnauthorizedError } from "@/libs/error";

export const authValidateAndReturnUid = async (): Promise<string> => {
  try {
    const supabase = createRouteHandlerClient({ cookies });
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
