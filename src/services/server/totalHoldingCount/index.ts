import { NotFoundError } from "@/libs/error";

import { handlePrismaError, prisma } from "../index";

export const fetchJaTotalHoldingCountServer = async (
  userId: string | null,
  marketType: "日本株" | "外国株"
) => {
  try {
    if (!userId) throw new NotFoundError();

    const result = await prisma.holding.groupBy({
      by: ["stockId"],
      where: {
        userId,
        stock: {
          marketType,
        },
      },
      _count: {
        stockId: true,
      },
    });
    return result.length;
  } catch (error) {
    return handlePrismaError(error);
  }
};
