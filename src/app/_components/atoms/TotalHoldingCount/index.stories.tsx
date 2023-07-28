import { Meta, StoryObj } from "@storybook/react";
import { FC, ReactNode } from "react";

const Component: FC = () => {
  return (
    <span className="text-sm font-semibold text-gray-500">{`全${55}件`}</span>
  );
};

const meta = {
  title: "Atoms/TotalHoldingCount",
  component: Component,
  tags: ["autodocs"],
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {};
