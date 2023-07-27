import { Meta, StoryObj } from "@storybook/react";

import { StockBasicInfo } from "./index";

const meta = {
  title: "Atoms/StockBasicInfo",
  component: StockBasicInfo,
  args: {
    stockCode: "1111",
    stockName: "大和ハウス工業",
    evaluationAmount: 30000,
    profitLossAmount: 10000,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StockBasicInfo>;

export default meta;

type Story = StoryObj<typeof StockBasicInfo>;

export const Default: Story = {};
