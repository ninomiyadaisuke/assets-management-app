import { Meta, StoryObj } from "@storybook/react";

import { Switch } from "./index";

const meta = {
  title: "Atoms/Switch",
  component: Switch,
} satisfies Meta<typeof Switch>;

export default meta;

type Stroy = StoryObj<typeof Switch>;

export const Default: Stroy = {};
