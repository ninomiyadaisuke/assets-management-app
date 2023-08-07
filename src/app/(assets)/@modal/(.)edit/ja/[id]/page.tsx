import DialogWrapper from "@/app/_components/molecules/DaialogWrapper";
import { JaStockEdit } from "@/app/_components/templates/JaStockEdit";
export default async function JaStokCreateModalPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <DialogWrapper>
      <JaStockEdit id={id} />
    </DialogWrapper>
  );
}
