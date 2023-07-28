import { Meta, StoryObj } from "@storybook/react";

import { JaStockAccordion } from "./index";

const meta = {
  title: "Template/JaStocks/JaStockAccordion",
  component: JaStockAccordion,
  tags: ["autodocs"],
} satisfies Meta<typeof JaStockAccordion>;

export default meta;

type Story = StoryObj<typeof JaStockAccordion>;

export const Default: Story = {};
