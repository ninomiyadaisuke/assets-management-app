import { Account } from "@prisma/client";

import { AssetType } from "@/contexts/assetTypeContext";
import { SearchedStockType } from "@/contexts/stocksInfoContext";
import { CreateFgnStockType } from "@/libs/schema/createFgnStock";
import { handlePrismaError, prisma } from "@/services/server/index";

type OmitSearchedStockType = Omit<SearchedStockType, "dividendYield">;

export type CreateFgnInputType = CreateFgnStockType &
  OmitSearchedStockType & {
    assetType: AssetType;
  };

export const createFgnStockServer = async (data: any) => {
  const assetTypes = ["特定口座", "新NISA口座"];
  const accountsToCreate =
    data.assetType === "両方" ? assetTypes : [data.assetType];

  try {
    const stock = await prisma.stock.create({
      data: {
        stockName: data.stockName,
        stockCode: data.stockCode,
        dividend: data.dividend,
        industry: data.industry,
        currentStockPrice: data.latestStockPrice,
        marketType: "外国株",
      },
    });

    const accounts = [] as Account[];
    // Create new account
    for (const accountType of accountsToCreate) {
      let account = await prisma.account.findUnique({
        where: {
          userId_accountType: {
            userId: data.uid,
            accountType: accountType,
          },
        },
      });

      if (!account) {
        account = await prisma.account.create({
          data: {
            userId: data.uid,
            accountType: accountType,
          },
        });
      }
      accounts.push(account);
    }

    // Create holdings and execute the transaction inside the loop
    const holdings = data.numberOfSharesHeld.map(
      (shares: number, index: number) => {
        return prisma.holding.create({
          data: {
            numberOfSharesHeld: shares,
            acquisitionPrice: data.acquisitionPrice[index],
            acquisitionPriceJPY: data.acquisitionPriceJPY[index],
            userId: data.uid,
            accountId: accounts[index]!.accountId,
            stockId: stock.stockId,
          },
        });
      }
    );

    // Execute the transaction
    const result = await prisma.$transaction(holdings);
    return { success: true, result: result };
  } catch (error) {
    handlePrismaError(error);
  }
};
