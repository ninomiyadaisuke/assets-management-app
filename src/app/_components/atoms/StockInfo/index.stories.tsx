import { Meta, StoryObj } from "@storybook/react";

import { StockInfo } from "./index";

const meta = {
  title: "Atoms/StockInfo",
  component: StockInfo,
  args: {
    unit: "株",
    value: 100,
    title: "test",
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StockInfo>;

export default meta;

type Story = StoryObj<typeof StockInfo>;

export const Default: Story = {};
