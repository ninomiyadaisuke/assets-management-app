import { Meta, StoryObj } from "@storybook/react";

import { SearchForm } from "./index";

const meta = {
  title: "Template/JaStockCreate/SearchForm",
  component: SearchForm,
  tags: ["autodocs"],
} satisfies Meta<typeof SearchForm>;

export default meta;

type Story = StoryObj<typeof SearchForm>;

export const Default: Story = {};
