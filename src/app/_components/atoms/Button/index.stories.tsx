import { Meta, StoryObj } from "@storybook/react";

import { Button } from "./index";

const meta = {
  title: "Atoms/Button",
  component: Button,
  args: { children: "送信する" },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Stroy = StoryObj<typeof Button>;

export const Default: Stroy = {};

export const Disabled: Stroy = {
  args: { disabled: true },
};
