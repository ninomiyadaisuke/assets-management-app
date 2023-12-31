import * as z from "zod";
import { ZodSchema } from "zod";

export function validate<T extends ZodSchema>(
  target: unknown,
  schema: T
): asserts target is z.infer<T> {
  schema.parse(target);
}

export const returnThemePlusOrMinus = (number: number) => {
  return Math.sign(number) === 1 ? "plus" : "minus";
};
