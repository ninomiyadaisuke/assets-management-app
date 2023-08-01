import { Meta, StoryObj } from "@storybook/react";

import { AlertDialog } from "./index";

const meta = {
  title: "Organisms/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
} satisfies Meta<typeof AlertDialog>;

export default meta;

type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {};
