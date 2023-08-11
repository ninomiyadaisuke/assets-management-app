import { Meta, StoryObj } from "@storybook/react";

import { CardWrapper } from "@/app/_components/atoms/CardWrapper";
import { TotalProfitAndLoss } from "@/app/_components/atoms/TotalProfitAndLoss";
import { TotalStocks } from "@/app/_components/atoms/TotalStocks";

const Component = () => {
  return (
    <CardWrapper>
      <TotalStocks unit="円" total={300000000} />
      <TotalProfitAndLoss
        unit="円"
        profitMargin={30.9}
        profitAndLossAmount={10000}
      />
    </CardWrapper>
  );
};

const meta = {
  title: "Template/FgnStocks/FgnStocksPriceCard",
  component: Component,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/foreign-stocks",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: Component,
};
