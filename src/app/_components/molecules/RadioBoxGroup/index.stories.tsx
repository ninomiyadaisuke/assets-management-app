import { Meta, StoryObj } from "@storybook/react";

import { RadioBoxGroup } from "./index";

const meta = {
  title: "Molecules/RadioBoxGroup",
  component: RadioBoxGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof RadioBoxGroup>;

export default meta;

type Story = StoryObj<typeof RadioBoxGroup>;

export const Default: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
