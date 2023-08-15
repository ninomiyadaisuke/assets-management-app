import { Meta, StoryObj } from "@storybook/react";

import { SelectForm } from "./index";

const meta = {
  title: "Template/EnStockCreate/SelectForm",
  component: SelectForm,
  args: {
    title: "Search",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SelectForm>;

export default meta;

type Story = StoryObj<typeof SelectForm>;

export const Default: Story = {};
