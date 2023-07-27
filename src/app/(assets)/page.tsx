import { CardWrapper } from "../_components/atoms/CardWrapper";
import { TotalProfitAndLoss } from "../_components/atoms/TotalProfitAndLoss";
import { TotalStocks } from "../_components/atoms/TotalStocks";

export default function Home() {
  return (
    <>
      <div>Toppage</div>
      <h1>Hello world</h1>
      <CardWrapper>
        <TotalStocks total={300000000} />
        <TotalProfitAndLoss profitMargin={30.9} profitAndLossAmount={10000} />
      </CardWrapper>
    </>
  );
}
