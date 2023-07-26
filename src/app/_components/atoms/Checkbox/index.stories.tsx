import { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./index";

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  args: { label: "チェックする？" },
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};
