import { z } from "zod";

const numberOfSharesHeldSchema = z.number().int().min(1);
const acquisitionPriceSchema = z.number().min(1);

export const createStockSchema = z.object({
  numberOfSharesHeld: z.array(numberOfSharesHeldSchema),
  acquisitionPrice: z.array(acquisitionPriceSchema),
});

export type CreateStockType = z.infer<typeof createStockSchema>;

export type UpdateStockType = CreateStockType;
