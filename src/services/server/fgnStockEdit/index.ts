import { UpdateFgnStockInput } from "@/app/_components/templates/FgnStockEdit/FgnStockEditForm";

import { handlePrismaError, prisma } from "../index";

export const fetchFgnStocksServer = async (userId: string, stockId: string) => {
  try {
    // 特定口座のデータを取得
    const holdingsSpecific = await prisma.holding.findMany({
      where: {
        userId,
        account: {
          accountType: "特定口座",
        },
        stock: {
          stockId,
        },
      },
      include: {
        account: true,
        stock: true,
      },
    });

    // 新NISA口座のデータを取得
    const holdingsNISA = await prisma.holding.findMany({
      where: {
        userId,
        account: {
          accountType: "新NISA口座",
        },
        stock: {
          stockId,
        },
      },
      include: {
        account: true,
        stock: true,
      },
    });

    // データを結合
    const holdings = [...holdingsSpecific, ...holdingsNISA];
    const holdingIdAndAccountTypes = holdings.map((holding) => ({
      holdingId: holding.holdingId,
      accountType: holding.account.accountType,
    }));

    const numberOfSharesHeld = holdings.map(
      (holding) => holding.numberOfSharesHeld
    );
    const acquisitionPrice = holdings.map(
      (holding) => holding.acquisitionPrice
    );
    const acquisitionPriceJPY = holdings.map(
      (holding) => holding.acquisitionPriceJPY!
    );
    return {
      stockName: holdings[0]?.stock.stockName,
      stockCode: holdings[0]?.stock.stockCode,
      holdingIdAndAccountTypes,
      defaultValues: {
        numberOfSharesHeld,
        acquisitionPrice,
        acquisitionPriceJPY,
      },
    };
  } catch (error) {
    return handlePrismaError(error);
  }
};

export type FgnStockReturn = Awaited<ReturnType<typeof fetchFgnStocksServer>>;

export const updateFgnStocksServer = async (input: UpdateFgnStockInput[]) => {
  try {
    const holdings = input.map((data) => {
      return prisma.holding.update({
        where: {
          holdingId: data.holdingId,
        },
        data: {
          acquisitionPrice: data.acquisitionPrice,
          numberOfSharesHeld: data.numberOfSharesHeld,
          acquisitionPriceJPY: data.acquisitionPriceJPY,
        },
      });
    });
    const result = await prisma.$transaction(holdings);
    return { success: true, result };
  } catch (error) {
    return handlePrismaError(error);
  }
};

export const createAndUpdateFgnStocksServer = async (
  input: UpdateFgnStockInput[],
  stockId: string,
  userId: string
) => {
  try {
    const createData = input.find((data) => data.holdingId === "");
    const updateData = input.find((data) => data.holdingId !== "");
    let account = await prisma.account.findUnique({
      where: {
        userId_accountType: {
          userId,
          accountType: createData!.accountType,
        },
      },
    });

    if (!account) {
      account = await prisma.account.create({
        data: {
          userId,
          accountType: createData!.accountType,
        },
      });
    }

    const createHoldingOperation = prisma.holding.create({
      data: {
        numberOfSharesHeld: createData!.numberOfSharesHeld!,
        acquisitionPrice: createData!.acquisitionPrice!,
        acquisitionPriceJPY: createData!.acquisitionPriceJPY!,
        userId,
        accountId: account.accountId,
        stockId,
      },
    });

    const operations = [createHoldingOperation];

    if (updateData) {
      const updatePayload: Partial<{
        acquisitionPrice: number;
        acquisitionPriceJPY: number;
        numberOfSharesHeld: number;
      }> = {};

      if (updateData.acquisitionPrice !== undefined) {
        updatePayload.acquisitionPrice = updateData.acquisitionPrice;
      }
      if (updateData.acquisitionPriceJPY !== undefined) {
        updatePayload.acquisitionPriceJPY = updateData.acquisitionPriceJPY;
      }
      if (updateData.numberOfSharesHeld !== undefined) {
        updatePayload.numberOfSharesHeld = updateData.numberOfSharesHeld;
      }

      const updateHoldingOperation = prisma.holding.update({
        where: {
          holdingId: updateData.holdingId,
        },
        data: updatePayload,
      });

      operations.push(updateHoldingOperation);
    }
    const result = await prisma.$transaction(operations);

    return { success: true, result };
  } catch (error) {
    return handlePrismaError(error);
  }
};
