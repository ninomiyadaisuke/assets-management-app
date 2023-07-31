"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { FC } from "react";

import { IconButton } from "@/app/_components/atoms/IconButton";
import type { Database } from "@/libs/database.types";

export const Nav: FC = () => {
  const router = useRouter();
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
          <IconButton theme={"update"} />
        </li>
        <li className="flex">
          <IconButton onClick={handleSignOut} theme={"logout"} />
        </li>
      </ul>
    </nav>
  );
};
