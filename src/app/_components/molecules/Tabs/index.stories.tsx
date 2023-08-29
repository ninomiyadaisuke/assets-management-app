import { Meta, StoryObj } from "@storybook/react";

import { Tabs } from "./index";

const meta = {
  title: "Molecules/Tabs",
  component: Tabs,
  args: {
    options: ["評価額", "配当額", "景気敏感割合"],
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
  },
};
