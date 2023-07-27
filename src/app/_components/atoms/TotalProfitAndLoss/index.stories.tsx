import { Meta } from "@storybook/react";

import { CardWrapper } from "../CardWrapper";
import { TotalStocks } from "../TotalStocks";
import { TotalProfitAndLoss } from "./index";

const meta = {
  title: "Atoms/TotalProfitAndLoss",
  component: TotalProfitAndLoss,
  tags: ["autodocs"],
} satisfies Meta<typeof TotalProfitAndLoss>;

export default meta;

const Template = () => (
  <CardWrapper>
    <TotalStocks total={300000000} />
    <TotalProfitAndLoss profitMargin={30.9} profitAndLossAmount={10000} />
  </CardWrapper>
);

export const Default = Template.bind({});
