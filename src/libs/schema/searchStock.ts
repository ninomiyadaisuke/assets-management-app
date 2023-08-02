import { z } from "zod";

export const searchInputSchema = z.object({
  code: z.string().min(1),
});

export type SearchInputSchema = z.infer<typeof searchInputSchema>;
