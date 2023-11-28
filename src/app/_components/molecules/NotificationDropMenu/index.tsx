"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { forwardRef, useState } from "react";

import { NotificationBadge } from "@/app/_components/atoms/NotificationBadge";
import { formatDate } from "@/libs/utils";
import { readMessagesClient } from "@/services/client/readMessages";
import { NotificationReturn } from "@/services/server/notificationFetch";

type Props = React.ComponentPropsWithRef<"button"> & {
  count: number;
  messages: NotificationReturn;
};

export type MessageReadStatus = {
  userMessageId: string;
  readAt: Date | null;
};

export const NotificationDropMenu = forwardRef<HTMLButtonElement, Props>(
  function NotificationDropMenuBase({ count, messages, ...props }, ref) {
    const [isRead, setIsRead] = useState(false);

    const unreadMessagesInfo = messages.map(({ userMessageId, readAt }) => ({
      userMessageId,
      readAt,
    }));

    const setMessagesToRead = async () => {
      await readMessagesClient(unreadMessagesInfo);
    };
    return (
      <DropdownMenu.Root
        onOpenChange={async () => {
          setIsRead(true);
          await setMessagesToRead();
        }}
      >
        <DropdownMenu.Trigger asChild>
          <NotificationBadge ref={ref} count={isRead ? 0 : count} {...props} />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="z-[100] flex min-w-[280px] flex-col gap-2 rounded-md bg-white p-2 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade">
            {messages.length !== 0 ? (
              messages.map(({ message: { content, createdAt }, messageId }) => {
                return (
                  <ul key={messageId}>
                    <li>
                      <DropdownMenu.Item className="flex flex-col gap-1">
                        <p className="text-sm font-semibold text-gray-700">
                          {content}
                        </p>
                        <p className="self-end text-xs text-gray-500">
                          {formatDate(createdAt)}
                        </p>
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator className="mt-1 h-[1px] bg-gray-400" />
                    </li>
                  </ul>
                );
              })
            ) : (
              <p className="text-center text-sm font-semibold text-gray-700">
                通知情報はありません
              </p>
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  }
);
