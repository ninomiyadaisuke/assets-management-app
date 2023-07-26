import { Meta, StoryObj } from "@storybook/react";

import { ComboboxWithError } from "./index";

const meta = {
  title: "Molecules/ComboboxWithError",
  component: ComboboxWithError,
  parameters: {
    a11y: {
      config: { rules: [{ id: "label", enabled: false }] },
    },
  },
  args: {
    children: (
      <>
        <option></option>
        <option>VYM</option>
        <option>HDV</option>
        <option>SPYD</option>
      </>
    ),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ComboboxWithError>;

export default meta;

type Story = StoryObj<typeof ComboboxWithError>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Error: Story = {
  args: { error: "エラーがあります。" },
};
