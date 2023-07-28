import { Meta, StoryObj } from "@storybook/react";

import { ExchangeRateWithSwitch } from "./index";

const meta = {
  title: "Molecules/ExchangeRateWithSwitch",
  component: ExchangeRateWithSwitch,
  tags: ["autodocs"],
} satisfies Meta<typeof ExchangeRateWithSwitch>;

export default meta;

type Story = StoryObj<typeof ExchangeRateWithSwitch>;

export const Default: Story = {};
