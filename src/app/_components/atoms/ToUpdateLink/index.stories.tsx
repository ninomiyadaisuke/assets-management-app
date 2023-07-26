import { Meta, StoryObj } from "@storybook/react";

import { ToUpdateLink } from "./index";

const meta = {
  title: "Atoms/ToUpdateLink",
  component: ToUpdateLink,
  args: { href: "/", children: "大和ハウス工業" },
  tags: ["autodocs"],
} satisfies Meta<typeof ToUpdateLink>;

export default meta;

type Story = StoryObj<typeof ToUpdateLink>;

export const Default: Story = {};
