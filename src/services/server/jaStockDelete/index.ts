import { NotFoundError } from "@/libs/error";
import { prisma } from "@/services/server/index";

import { handlePrismaError } from "..";

export const fetchJaStocksServer = async (holdingId: string) => {
  try {
    const holding = await prisma.holding.findFirst({
      where: { holdingId },
    });

    if (!holding) throw new NotFoundError();

    const { stockId } = holding;

    const holdings = await prisma.holding.findMany({ where: { stockId } });

    if (holdings.length === 1) {
      // if there is only one holding, delete both the holding and the stock
      await prisma.$transaction([
        prisma.holding.delete({ where: { holdingId } }),
        prisma.stock.delete({ where: { stockId } }),
      ]);
    } else {
      // if there is more than one holding, delete only the holding
      await prisma.holding.delete({ where: { holdingId } });
    }
  } catch (error) {
    handlePrismaError(error);
  }
  return;
};
