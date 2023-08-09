import { JaStockEdit } from "@/app/_components/templates/JaStockEdit";

export default async function JaStokEditPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <div className="px-3 py-10">
      <JaStockEdit id={id} />
    </div>
  );
}
