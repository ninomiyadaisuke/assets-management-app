"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { FC, use } from "react";

import { IconButton } from "@/app/_components/atoms/IconButton";
import { NotificationDropMenu } from "@/app/_components/molecules/NotificationDropMenu";
import { useSocket } from "@/hooks/useSocket";
import type { Database } from "@/libs/database.types";
import { NotificationPromise } from "@/services/server/notificationFetch";

type Props = {
  userMessagePromise: NotificationPromise;
};

export const Nav: FC<Props> = ({ userMessagePromise }) => {
  const router = useRouter();
  const { value } = useSocket();
  const userMessages = use(userMessagePromise);
  const filterUserMessages = userMessages.filter((um) => um.isRead === false);

  const supabase = createClientComponentClient<Database>();
  const plusOne = value ? 1 : 0;
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/auth/login");
  };
  return (
    <nav>
      <ul className="flex gap-5">
        <li className="flex">
          <NotificationDropMenu
            count={filterUserMessages.length + plusOne}
            messages={userMessages}
          />
        </li>
        <li className="flex">
          <IconButton onClick={handleSignOut} theme={"logout"} />
        </li>
      </ul>
    </nav>
  );
};
