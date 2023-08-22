import { JaAndFgnGraph } from "@/app/_components/templates/JaAndFgnGraph";

export default function JaAndFgnGraphPage({
  searchParams,
}: {
  searchParams:
    | { [key: string]: never }
    | { status: "評価額" }
    | { status: "配当額" }
    | { status: "景気敏感割合" };
}) {
  const { status } = searchParams;
  return <JaAndFgnGraph status={status ? status : "評価額"} />;
}
