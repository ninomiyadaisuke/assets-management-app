import { PrismaClient } from "@prisma/client";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { cache } from "react";

import { Database } from "@/libs/database.types";
import { BadRequestError, InternalServerError } from "@/libs/error";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const handlePrismaError = (err: unknown) => {
  if (err instanceof PrismaClientValidationError) {
    throw new BadRequestError();
  }
  if (err instanceof PrismaClientKnownRequestError) {
    throw new BadRequestError();
  }
  if (err instanceof PrismaClientUnknownRequestError) {
    throw new BadRequestError();
  }
  if (err instanceof PrismaClientInitializationError) {
    throw new InternalServerError();
  }
  throw err;
};

export const createRouteHandlerClientCache = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
});
