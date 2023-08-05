import { Account } from "@prisma/client";

import { AssetType } from "@/contexts/assetTypeContext";
import { SearchedStockType } from "@/contexts/stocksInfoContext";
import { CreateStockType } from "@/libs/schema/createStock";

import { handlePrismaError, prisma } from "../index";

type OmitSearchedStockType = Omit<SearchedStockType, "dividendYield">;

export type CreateInputType = CreateStockType &
  OmitSearchedStockType & {
    assetType: AssetType;
  };

export const createStock = async (input: CreateInputType, userId: string) => {
  // console.log(input);

  const assetTypes = ["特定口座", "新NISA口座"];
  const accountsToCreate =
    input.assetType === "両方" ? assetTypes : [input.assetType];
  try {
    const stock = await prisma.stock.create({
      data: {
        stockName: input.stockName,
        stockCode: input.stockCode,
        dividend: input.dividend,
        industry: input.industry,
        currentStockPrice: input.latestStockPrice,
        marketType: "日本株",
      },
    });
    const accounts = [] as Account[];

    // Create new account
    for (const accountType of accountsToCreate) {
      let account = await prisma.account.findUnique({
        where: {
          userId_accountType: {
            userId,
            accountType,
          },
        },
      });

      if (!account) {
        account = await prisma.account.create({
          data: {
            userId,
            accountType,
          },
        });
      }
      accounts.push(account);
    }
    // Create holdings and execute the transaction inside the loop
    const holdings = input.numberOfSharesHeld.map(
      (shares: number, index: number) => {
        return prisma.holding.create({
          data: {
            numberOfSharesHeld: shares,
            acquisitionPrice: input.acquisitionPrice[index],
            userId,
            accountId: accounts[index]!.accountId,
            stockId: stock.stockId,
          },
        });
      }
    );
    // Execute the transaction
    const result = await prisma.$transaction(holdings);
    return result;
  } catch (error) {
    handlePrismaError(error);
  }
};
