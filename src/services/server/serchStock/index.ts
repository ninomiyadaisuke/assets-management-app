import { SearchedStockType } from "@/contexts/stocksInfoContext";
import { GoogleApiError, handleGoogleSheetsError } from "@/libs/error";
import { convertToNumber } from "@/libs/utils";

import { authValidateAndReturnUid } from "../auth";
import { handlePrismaError, prisma } from "../index";

export const searchStock = async (
  code: string
): Promise<SearchedStockType | { message: string } | { code: string }> => {
  const { google } = await import("googleapis"); //
  const uid = await authValidateAndReturnUid();
  try {
    const holding = await prisma.holding.findFirst({
      where: {
        AND: [
          {
            user: {
              userId: uid,
            },
          },
          {
            stock: {
              stockCode: code,
            },
          },
        ],
      },
      select: {
        user: {
          select: {
            userId: true,
          },
        },
        stock: {
          select: {
            stockCode: true,
          },
        },
      },
    });
    if (holding) return { message: "この株式はすでに保有しています。" };
  } catch (error) {
    handlePrismaError(error);
  }
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID; // ここにスプレッドシートのIDを入力
    const sheetName = "閲覧専用"; // ここにシートの名前を入力
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });
    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:G`,
    });
    const rows = response.data.values;
    if (rows) {
      const targetRow = rows.find((row) => row[0] === code);
      if (targetRow) {
        const [
          code,
          irBankCode,
          companyName,
          latestStockPrice,
          industry,
          dividend,
          dividendYield,
        ] = targetRow;
        const data = {
          stockCode: code,
          irBankCode,
          stockName: companyName,
          latestStockPrice: convertToNumber(latestStockPrice),
          industry,
          dividend: convertToNumber(dividend),
          dividendYield,
        } as SearchedStockType;
        return data;
      }
    }
  } catch (error) {
    handleGoogleSheetsError(error as GoogleApiError);
  }
  return { code };
};

export type SearchReturn = Awaited<ReturnType<typeof searchStock>>;
