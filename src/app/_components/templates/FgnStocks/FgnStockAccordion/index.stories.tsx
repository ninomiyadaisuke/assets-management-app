import { Meta, StoryObj } from "@storybook/react";

import { FgnStockAccordion } from "./index";

const meta = {
  title: "Template/FgnStocks/FgnStockAccordion",
  component: FgnStockAccordion,
  tags: ["autodocs"],
} satisfies Meta<typeof FgnStockAccordion>;

export default meta;

type Story = StoryObj<typeof FgnStockAccordion>;

export const Default: Story = {};
