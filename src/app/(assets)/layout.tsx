import "@/app/globals.css";

import cx from "classnames";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Layout } from "@/app/_components/layouts";
import { UnauthorizedError } from "@/libs/error";
import { prisma } from "@/services/server";
import { serverComponentAuthValidateAndReturnUid } from "@/services/server/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const userId = await serverComponentAuthValidateAndReturnUid();
  if (!userId) throw new UnauthorizedError();
  const userMessagePromise = prisma.userMessage.findMany({
    where: {
      userId,
    },
    select: {
      message: {
        select: {
          content: true,
          messageId: true,
        },
      },
      isRead: true,
      readAt: true,
      messageId: true,
      userMessageId: true,
    },
  });

  return (
    <html lang="en">
      <body
        className={cx(
          inter.className,
          "flex justify-center h-full w-full m-0 p-0 bg-[#d6d6d6]"
        )}
      >
        <Layout userMessagePromise={userMessagePromise}>{children}</Layout>
        {modal}
      </body>
    </html>
  );
}
