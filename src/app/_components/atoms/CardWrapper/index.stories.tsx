import { Meta, StoryObj } from "@storybook/react";

import { CardWrapper } from "./index";

const meta = {
  title: "Atoms/CardWrapper",
  component: CardWrapper,
  args: {
    children: <div className="h-[200px] w-full">コンテンツが入ります</div>,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CardWrapper>;

export default meta;

type Story = StoryObj<typeof CardWrapper>;

export const Default: Story = {};
