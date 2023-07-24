import { Meta, StoryObj } from "@storybook/react";

import { IconLinkWithText } from "./index";

const meta = {
  title: "Atoms/IconLinkWithText",
  component: IconLinkWithText,
  tags: ["autodocs"],
} satisfies Meta<typeof IconLinkWithText>;

export default meta;

type Story = StoryObj<typeof IconLinkWithText>;

export const Default: Story = {
  args: {
    href: "/",
  },
};

export const Active: Story = {
  args: {
    href: "/",
    "aria-current": "page",
  },
};
