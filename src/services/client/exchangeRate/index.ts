import { typedFetch } from "@/libs/fetchUtils";

import { url } from "../url";

export type ExchangeRateApiResponse = {
  base_code: string;
  conversion_rates: {
    JPY: number;
  };
};

export const fetchLatestUsdToJpyRateClient =
  async (): Promise<ExchangeRateApiResponse> => {
    return await typedFetch<ExchangeRateApiResponse>(
      // `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API}/latest/USD`,
      `${url}/api/exchange-rate`,
      {
        next: { revalidate: 30000 },
      }
    );
  };
