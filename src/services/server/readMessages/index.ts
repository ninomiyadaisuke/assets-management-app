import { MessageReadStatus } from "@/app/_components/molecules/NotificationDropMenu";
import { NotFoundError } from "@/libs/error";

import { handlePrismaError, prisma } from "../index";

export const readMessagesServer = async (messages: MessageReadStatus[]) => {
  try {
    const updatePromise = messages.map((messages) =>
      prisma.userMessage.update({
        where: {
          userMessageId: messages.userMessageId,
        },
        data: {
          isRead: true,
          readAt: new Date(),
        },
      })
    );
    const result = await prisma.$transaction(updatePromise);
    return result;
  } catch (error) {
    handlePrismaError(error);
    throw error;
  }
};
