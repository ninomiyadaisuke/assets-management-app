import { Meta, StoryObj } from "@storybook/react";

import { FloatingButton } from "./index";

const meta = {
  title: "Atoms/FloatingButton",
  component: FloatingButton,
  tags: ["autodocs"],
} satisfies Meta<typeof FloatingButton>;

export default meta;

type Story = StoryObj<typeof FloatingButton>;

export const Default: Story = {
  args: { href: "/" },
};
