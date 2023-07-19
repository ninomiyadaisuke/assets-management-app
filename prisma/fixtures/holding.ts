import { Holding } from "@prisma/client";

export const holdingsFixtures = (): Omit<
  Holding,
  "createdAt" | "updatedAt"
>[] => [
  {
    holdingId: "holding1",
    accountId: process.env.ACCOUNT_SPECIFIC_ID!,
    numberOfSharesHeld: 100,
    acquisitionPrice: 900,
    acquisitionPriceJPY: null,
    // 外部キー
    userId: process.env.UID!,
    stockId: "stock1",
  },
  {
    holdingId: "holding2",
    accountId: process.env.ACCOUNT_SPECIFIC_ID!,
    numberOfSharesHeld: 100,
    acquisitionPrice: 900,
    acquisitionPriceJPY: null,
    // 外部キー
    userId: process.env.UID!,
    stockId: "stock2",
  },
  {
    holdingId: "holding3",
    accountId: process.env.ACCOUNT_SPECIFIC_ID!,
    numberOfSharesHeld: 100,
    acquisitionPrice: 900,
    acquisitionPriceJPY: null,
    // 外部キー
    userId: process.env.UID!,
    stockId: "stock3",
  },
  {
    holdingId: "holding4",
    accountId: process.env.ACCOUNT_SPECIFIC_ID!,
    numberOfSharesHeld: 100,
    acquisitionPrice: 900,
    acquisitionPriceJPY: null,
    // 外部キー
    userId: process.env.UID!,
    stockId: "stock4",
  },
  {
    holdingId: "holding5",
    accountId: process.env.ACCOUNT_SPECIFIC_ID!,
    numberOfSharesHeld: 100,
    acquisitionPrice: 26,
    acquisitionPriceJPY: 3640,
    // 外部キー
    userId: process.env.UID!,
    stockId: "stock5",
  },
  {
    holdingId: "holding6",
    accountId: process.env.ACCOUNT_NISA_ID!,
    numberOfSharesHeld: 100,
    acquisitionPrice: 26,
    acquisitionPriceJPY: 3640,
    // 外部キー
    userId: process.env.UID!,
    stockId: "stock6",
  },
  {
    holdingId: "holding7",
    accountId: process.env.ACCOUNT_NISA_ID!,
    numberOfSharesHeld: 100,
    acquisitionPrice: 26,
    acquisitionPriceJPY: 3640,
    // 外部キー
    userId: process.env.UID!,
    stockId: "stock7",
  },
  {
    holdingId: "holding8",
    accountId: process.env.ACCOUNT_NISA_ID!,
    numberOfSharesHeld: 100,
    acquisitionPrice: 26,
    acquisitionPriceJPY: 3640,
    // 外部キー
    userId: process.env.UID!,
    stockId: "stock8",
  },
];
