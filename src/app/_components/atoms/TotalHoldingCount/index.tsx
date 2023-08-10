import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache, FC } from "react";

import { Database } from "@/libs/database.types";
import { InternalServerError, UnauthorizedError } from "@/libs/error";
import { fetchJaTotalHoldingCountClient } from "@/services/client/totalHoldingCount";

type Props = {
  country: "ja" | "foreign";
};

const createServerComponentClientCache = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
});
const serverComponentAuthValidateAndReturnUid = async (): Promise<string> => {
  try {
    const supabase = createServerComponentClientCache();
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

export const TotalHoldingCount: FC<Props> = async ({ country }) => {
  const uid = await serverComponentAuthValidateAndReturnUid();
  const totalCount = await fetchJaTotalHoldingCountClient(uid, country);
  return (
    <span className="text-sm font-semibold text-gray-500">{`全${totalCount}件`}</span>
  );
};
