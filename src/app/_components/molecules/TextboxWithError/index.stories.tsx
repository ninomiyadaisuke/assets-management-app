import { Meta, StoryObj } from "@storybook/react";

import { TextboxWithError } from "./index";

const meta = {
  title: "Molecules/TextboxWithError",
  component: TextboxWithError,
  args: {
    id: "title",
    name: "title",
    defaultValue: "タイトル",
    maxLength: 10,
  },
  parameters: {
    a11y: {
      config: { rules: [{ id: "label", enabled: false }] },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof TextboxWithError>;

export default meta;

type Stroy = StoryObj<typeof TextboxWithError>;

export const Default: Stroy = {};

export const Error: Stroy = {
  args: { error: "エラーがあります" },
};
