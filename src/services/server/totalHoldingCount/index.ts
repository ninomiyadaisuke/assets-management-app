import { NotFoundError } from "@/libs/error";

import { handlePrismaError, prisma } from "../index";

export const fetchJaTotalHoldingCountServer = async (
  userId: string | null,
  marketType: "日本株" | "外国株"
) => {
  try {
    if (!userId) throw new NotFoundError();
    const count = await prisma.holding.count({
      where: {
        userId,
        stock: {
          marketType,
        },
      },
    });

    return count;
  } catch (error) {
    return handlePrismaError(error);
  }
};
