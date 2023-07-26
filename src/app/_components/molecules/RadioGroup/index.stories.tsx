import { Meta, StoryObj } from "@storybook/react";

import { RadioGroup } from "./index";

const meta = {
  title: "Molecules/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {};
