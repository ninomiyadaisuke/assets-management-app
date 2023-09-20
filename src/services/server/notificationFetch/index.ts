import { NotFoundError } from "@/libs/error";

import { handlePrismaError, prisma } from "../index";

export const fetchNotificationServer = async (userId: string | null) => {
  try {
    if (!userId) throw new NotFoundError();
    const userMessages = await prisma.userMessage.findMany({
      where: {
        userId,
      },
      select: {
        message: {
          select: {
            content: true,
            messageId: true,
            createdAt: true,
          },
        },
        isRead: true,
        readAt: true,
        messageId: true,
        userMessageId: true,
      },
    });
    return userMessages;
  } catch (error) {
    return handlePrismaError(error);
  }
};

export type NotificationReturn = Awaited<
  ReturnType<typeof fetchNotificationServer>
>;

export type NotificationPromise = ReturnType<typeof fetchNotificationServer>;
