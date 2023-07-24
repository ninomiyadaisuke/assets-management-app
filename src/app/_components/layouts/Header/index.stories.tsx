import { Meta, StoryObj } from "@storybook/react";

import { Header } from "./index";

const meta = {
  title: "Layouts/Header",
  component: Header,
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;

type Stroy = StoryObj<typeof Header>;

export const Default: Stroy = {};
