// import { headers } from "next/headers";

// import { typedFetch } from "@/libs/fetchUtils";
// import type { JaStockTotalReturn } from "@/services/server/jaStockTotal";

// export const getJaStocksTotal = async () => {
//   return typedFetch<JaStockTotalReturn>(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/stocks/ja/total`,
//     {
//       headers: {
//         cookie: headers().get("cookie") as string,
//       },
//       cache: "no-store",
//     }
//   );
// };
