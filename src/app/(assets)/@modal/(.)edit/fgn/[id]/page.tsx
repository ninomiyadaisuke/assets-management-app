import DialogWrapper from "@/app/_components/molecules/DaialogWrapper";
import { FgnStockEdit } from "@/app/_components/templates/FgnStockEdit";
export default async function FgnStokCreateModalPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <DialogWrapper>
      <FgnStockEdit id={id} />
    </DialogWrapper>
  );
}
