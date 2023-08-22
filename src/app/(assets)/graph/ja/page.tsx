import { JaGraph } from "@/app/_components/templates/JaGraph";

export default function JaGraphPage({
  searchParams,
}: {
  searchParams:
    | { [key: string]: never }
    | { status: "評価額" }
    | { status: "配当額" }
    | { status: "景気敏感割合" };
}) {
  const { status } = searchParams;
  return (
    <>
      <JaGraph status={status ? status : "評価額"} />
    </>
  );
}
