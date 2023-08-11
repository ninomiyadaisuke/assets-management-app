import { FgnStocks } from "@/app/_components/templates/FgnStocks";
export default function ForeignStocks({
  searchParams,
}: {
  searchParams:
    | { [key: string]: never }
    | { status: "dollar" }
    | { status: "yen" };
}) {
  const { status } = searchParams;
  return <FgnStocks status={status ? status : "yen"} />;
}
