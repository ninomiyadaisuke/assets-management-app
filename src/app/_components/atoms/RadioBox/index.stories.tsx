import { Meta, StoryObj } from "@storybook/react";

import { RadioBox } from "./index";

const meta = {
  title: "Atoms/RadioBox",
  component: RadioBox,
  tags: ["autodocs"],
} satisfies Meta<typeof RadioBox>;

export default meta;

type Stroy = StoryObj<typeof RadioBox>;

export const Default: Stroy = { args: { label: "配当額" } };
