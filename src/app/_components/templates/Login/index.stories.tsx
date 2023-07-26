import { Meta, StoryObj } from "@storybook/react";

import { Login } from "./index";

const meta = {
  title: "Template/Login",
  component: Login,
  tags: ["autodocs"],
} satisfies Meta<typeof Login>;

export default meta;

type Story = StoryObj<typeof Login>;

export const Default: Story = {};
