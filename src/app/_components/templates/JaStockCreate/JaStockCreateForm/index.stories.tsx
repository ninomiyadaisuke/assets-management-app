import { Meta, StoryObj } from "@storybook/react";

import { JaStockCreateForm } from "./index";

const meta = {
  title: "Template/JaStockCreate/JaStockCreateForm",
  component: JaStockCreateForm,
  args: {
    title: "Search",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof JaStockCreateForm>;

export default meta;

type Story = StoryObj<typeof JaStockCreateForm>;

export const Default: Story = {};
