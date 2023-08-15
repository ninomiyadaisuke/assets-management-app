import { z } from "zod";

const numberOfSharesHeldSchema = z.number().int().min(1);
const acquisitionPriceSchema = z.number().min(1);

export const createFgnStockSchema = z.object({
  numberOfSharesHeld: z.array(numberOfSharesHeldSchema),
  acquisitionPrice: z.array(acquisitionPriceSchema),
  acquisitionPriceJPY: z.array(acquisitionPriceSchema),
});

export type CreateFgnStockType = z.infer<typeof createFgnStockSchema>;

export type UpdateFgnStockType = CreateFgnStockType;
