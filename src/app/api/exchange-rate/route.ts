import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    base_code: "test",
    conversion_rates: {
      JPY: 140,
    },
  });
}
