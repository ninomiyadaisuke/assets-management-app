"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { FC, use } from "react";

import { IconButton } from "@/app/_components/atoms/IconButton";
import { NotificationBadge } from "@/app/_components/atoms/NotificationBadge";
import type { Database } from "@/libs/database.types";
import { NotificationPromise } from "@/services/server/notificationFetch";

type Props = {
  userMessagePromise: NotificationPromise;
};

export const Nav: FC<Props> = ({ userMessagePromise }) => {
  const router = useRouter();
  const userMessages = use(userMessagePromise);

  const supabase = createClientComponentClient<Database>();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/auth/login");
  };
  return (
    <nav>
      <ul className="flex gap-5">
        <li className="flex">
          <NotificationBadge count={userMessages.length} />
        </li>
        <li className="flex">
          <IconButton onClick={handleSignOut} theme={"logout"} />
        </li>
      </ul>
    </nav>
  );
};
