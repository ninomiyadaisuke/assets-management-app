import { Meta, StoryObj } from "@storybook/react";

import { Layout } from "./index";

const meta = {
  title: "Layouts/Layout",
  component: Layout,

  tags: ["autodocs"],
} satisfies Meta<typeof Layout>;

export default meta;

type Stroy = StoryObj<typeof Layout>;

export const Default: Stroy = {};
