import { Meta, StoryObj } from "@storybook/react";

import { NotificationBadge } from "./index";

const meta = {
  title: "Atoms/NotificationBadge",
  component: NotificationBadge,
  args: {
    count: 10,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NotificationBadge>;

export default meta;

type Stroy = StoryObj<typeof NotificationBadge>;

export const Default: Stroy = {};
