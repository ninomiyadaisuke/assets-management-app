import { User } from "@prisma/client";

export const usersFixtures = (): Omit<User, "createdAt" | "updatedAt">[] => [
  {
    userId: process.env.UID!,
    email: process.env.EMAIL!,
  },
];
