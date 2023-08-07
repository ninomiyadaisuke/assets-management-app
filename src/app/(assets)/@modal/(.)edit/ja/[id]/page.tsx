import DialogWrapper from "@/app/_components/molecules/DaialogWrapper";
import { fetchStockData } from "@/services/client/JaStockEdit";
export default async function JaStokCreateModalPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const promiseData = fetchStockData(id);
  return (
    <DialogWrapper>
      <p>jaStockEditModal page</p>
    </DialogWrapper>
  );
}
