import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";

import { Switch } from "./index";

const meta = {
  title: "Atoms/Switch",
  component: Switch,
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const WithFocusState = {
  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement);
    canvas.getByRole("switch").focus();
  },
};
