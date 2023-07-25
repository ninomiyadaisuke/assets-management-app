import { Meta, StoryObj } from "@storybook/react";

import { Footer } from "./index";

const meta = {
  title: "Layouts/Footer",
  component: Footer,
  tags: ["autodocs"],
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
