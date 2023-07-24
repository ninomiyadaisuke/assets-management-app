import { Meta, StoryObj } from "@storybook/react";

import { SearchButton } from "./index";

const meta = {
  title: "Atoms/SearchButton",
  component: SearchButton,
  tags: ["autodocs"],
} satisfies Meta<typeof SearchButton>;

export default meta;

type Stroy = StoryObj<typeof SearchButton>;

export const Default: Stroy = {};

export const Disabled: Stroy = {
  args: { disabled: true },
};
