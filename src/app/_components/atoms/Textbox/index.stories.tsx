import { Meta, StoryObj } from "@storybook/react";

import { Textbox } from "./index";

const meta = {
  title: "Atoms/Textbox",
  component: Textbox,
  args: { placeholder: "ここに文字を入力します" },
  tags: ["autodocs"],
} satisfies Meta<typeof Textbox>;

export default meta;

type Stroy = StoryObj<typeof Textbox>;

export const Default: Stroy = {};

export const Disabled: Stroy = {
  args: { disabled: true },
};

export const Invalid: Stroy = {
  args: { "aria-invalid": true },
};
