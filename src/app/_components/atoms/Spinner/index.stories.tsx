import { Meta, StoryObj } from "@storybook/react";

import { Spinner } from "./index";

const meta = {
  title: "Atoms/Spinner",
  component: Spinner,
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>;

export default meta;

type Stroy = StoryObj<typeof Spinner>;

export const Default: Stroy = {};
