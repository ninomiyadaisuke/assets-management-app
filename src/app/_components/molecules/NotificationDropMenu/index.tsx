"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import { NotificationBadge } from "@/app/_components/atoms/NotificationBadge";
import { NotificationReturn } from "@/services/server/notificationFetch";

type Props = React.ComponentPropsWithRef<"button"> & {
  count: number;
  messages: NotificationReturn;
};

export const NotificationDropMenu = forwardRef<HTMLButtonElement, Props>(
  function NotificationDropMenuBase({ count, messages, ...props }, ref) {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <NotificationBadge ref={ref} count={count} {...props} />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="z-[100] min-w-[320px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
            sideOffset={5}
          >
            {messages.map(({ message, messageId }) => (
              <DropdownMenu.Item key={messageId}>
                {message.content}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  }
);
