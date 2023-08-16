import { FgnStockEdit } from "@/app/_components/templates/FgnStockEdit";

export default async function FgnStokEditPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <div className="px-3 py-10">
      <FgnStockEdit id={id} />
    </div>
  );
}
