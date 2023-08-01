import { z } from "zod";

const numberOfSharesHeldSchema = z.string().min(1);
const acquisitionPriceSchema = z.string().min(1);

export const createStockSchema = z.object({
  numberOfSharesHeld: z.array(numberOfSharesHeldSchema),
  acquisitionPrice: z.array(acquisitionPriceSchema),
});

export type CreateStockType = z.infer<typeof createStockSchema>;
