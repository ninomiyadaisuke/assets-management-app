import { Meta, StoryObj } from "@storybook/react";

import { JaStockCreate } from "./index";

const meta = {
  title: "Template/JaStockCreate/JaStockCreate",
  component: JaStockCreate,
  tags: ["autodocs"],
} satisfies Meta<typeof JaStockCreate>;

export default meta;

type Story = StoryObj<typeof JaStockCreate>;

export const Default: Story = {};
