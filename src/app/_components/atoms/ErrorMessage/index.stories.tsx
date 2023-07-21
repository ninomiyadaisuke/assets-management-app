import { Meta, StoryObj } from "@storybook/react";

import { ErrorMessage } from "./index";

const meta = {
  title: "Atoms/ErrorMessage",
  component: ErrorMessage,
  args: { children: "errorです。" },
  tags: ["autodocs"],
} satisfies Meta<typeof ErrorMessage>;

export default meta;

type Stroy = StoryObj<typeof ErrorMessage>;

export const Default: Stroy = {};
