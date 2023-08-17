import { Meta, StoryObj } from "@storybook/react";

import { TotalPriceByType } from "./index";

const meta = {
  title: "Molecules/TotalPriceByType",
  component: TotalPriceByType,
  tags: ["autodocs"],
} satisfies Meta<typeof TotalPriceByType>;

export default meta;

type Story = StoryObj<typeof TotalPriceByType>;

export const Default: Story = {
  args: {
    title: "化学",
    color: "bg-[#2774cc]",
    price: 1000,
  },
};
