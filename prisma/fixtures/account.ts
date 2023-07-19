import { Account } from "@prisma/client";
// Omit<Like, "id" | "createdAt">
export const accountsFixtures = (): Omit<
  Account,
  "createdAt" | "updatedAt"
>[] => [
  {
    accountId: process.env.ACCOUNT_NISA_ID!,
    accountType: "特定口座",
    userId: process.env.UID!,
  },
  {
    accountId: process.env.ACCOUNT_SPECIFIC_ID!,
    accountType: "新NISA口座",
    userId: process.env.UID!,
  },
];
