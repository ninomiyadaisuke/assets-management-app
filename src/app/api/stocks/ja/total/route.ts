import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { cache } from "react";

import { Database } from "@/libs/database.types";
import { NotFoundError, UnauthorizedError } from "@/libs/error";
import { prisma } from "@/services/server";
import { jaStockTotal } from "@/services/server/jaStockTotal";

export async function GET() {
  const createRouteHandlerClientCache = cache(() => {
    const cookieStore = cookies();
    return createRouteHandlerClient<Database>({ cookies: () => cookieStore });
  });
  try {
    const supabase = createRouteHandlerClientCache();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) throw new UnauthorizedError();
    const uid = session.user.id;
    const holdings = await prisma.holding.findMany({
      select: {
        stockId: true,
        numberOfSharesHeld: true,
        acquisitionPrice: true,
        stock: {
          select: {
            stockId: true,
            currentStockPrice: true,
            marketType: true,
          },
        },
      },
      where: {
        userId: uid,
      },
    });
    const foreignHoldings = holdings.filter(
      (holding) => holding.stock.marketType === "日本株"
    );

    if (!foreignHoldings) throw new NotFoundError();

    const currentStockPriceSum = foreignHoldings.reduce(
      (sum, holding) =>
        sum + holding.stock.currentStockPrice * holding.numberOfSharesHeld,
      0
    );

    const acquisitionPriceSumJPY = foreignHoldings.reduce(
      (sum, holding) =>
        sum + holding.acquisitionPrice! * holding.numberOfSharesHeld,
      0
    );
    const profitLossAmount = currentStockPriceSum - acquisitionPriceSumJPY;
    const evaluationProfitLossRate =
      (profitLossAmount / currentStockPriceSum) * 100;
    return NextResponse.json({
      currentStockPriceSum,
      profitLossAmount,
      evaluationProfitLossRate,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw error;
    }
  }
  // const data = await jaStockTotal();
}
