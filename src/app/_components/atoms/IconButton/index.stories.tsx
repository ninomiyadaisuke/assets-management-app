import { Meta, StoryObj } from "@storybook/react";

import { IconButton } from "./index";

const meta = {
  title: "Atoms/IconButton",
  component: IconButton,
  tags: ["autodocs"],
} satisfies Meta<typeof IconButton>;

export default meta;

type Stroy = StoryObj<typeof IconButton>;

export const Default: Stroy = {};

export const Update: Stroy = {
  args: { theme: "update" },
};
