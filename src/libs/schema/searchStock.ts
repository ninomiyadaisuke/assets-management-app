import { z } from "zod";

export const SearchInputSchema = z.object({
  code: z.string().min(1),
});
