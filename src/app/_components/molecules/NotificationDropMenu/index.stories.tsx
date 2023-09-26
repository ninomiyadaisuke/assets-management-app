import { Meta, StoryObj } from "@storybook/react";

import { NotificationDropMenu } from "./index";

const meta = {
  title: "Molecules/NotificationDropMenu",
  component: NotificationDropMenu,
  args: { count: 3 },
  tags: ["autodocs"],
} satisfies Meta<typeof NotificationDropMenu>;

export default meta;

type Story = StoryObj<typeof NotificationDropMenu>;

export const Default: Story = {};
