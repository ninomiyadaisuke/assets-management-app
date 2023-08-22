import { FgnGraph } from "@/app/_components/templates/FgnGraph";

export default function FgnGraphPage({
  searchParams,
}: {
  searchParams:
    | { [key: string]: never }
    | { status: "評価額" }
    | { status: "配当額" }
    | { status: "景気敏感割合" };
}) {
  const { status } = searchParams;
  return <FgnGraph status={status ? status : "評価額"} />;
}
