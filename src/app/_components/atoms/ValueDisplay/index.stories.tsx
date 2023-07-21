import { Meta, StoryObj } from "@storybook/react";

import { ValueDisplay } from "./index";

const meta = {
  title: "Atoms/ValueDisplay",
  component: ValueDisplay,
  tags: ["autodocs"],
} satisfies Meta<typeof ValueDisplay>;

export default meta;

type Stroy = StoryObj<typeof ValueDisplay>;

export const Default: Stroy = { args: { children: 100 } };
