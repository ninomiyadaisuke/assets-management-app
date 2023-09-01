import { Meta, StoryObj } from "@storybook/react";

import { ToggleButton } from "./index";

const meta = {
  title: "Atoms/ToggleButton",
  component: ToggleButton,
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleButton>;

export default meta;

type Story = StoryObj<typeof ToggleButton>;

export const Default: Story = {};
