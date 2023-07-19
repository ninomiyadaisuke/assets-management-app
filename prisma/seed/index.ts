import { PrismaClient } from "@prisma/client";

import { accountsFixtures } from "../fixtures/account";
import { holdingsFixtures } from "../fixtures/holding";
import { stocksFixtures } from "../fixtures/stock";
import { usersFixtures } from "../fixtures/user";

export const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: usersFixtures(),
  });
  await prisma.account.createMany({
    data: accountsFixtures(),
  });
  await prisma.stock.createMany({
    data: stocksFixtures(),
  });
  await prisma.holding.createMany({
    data: holdingsFixtures(),
  });
}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
