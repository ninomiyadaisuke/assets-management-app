import { Meta, StoryObj } from "@storybook/react";

import { Combobox } from "./index";

const meta = {
  title: "Molecules/Combobox",
  component: Combobox,
  parameters: {
    a11y: {
      config: { rules: [{ id: "label", enabled: false }] },
    },
  },
  args: {
    children: (
      <>
        <option></option>
        <option>VYM</option>
        <option>HDV</option>
        <option>SPYD</option>
      </>
    ),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Combobox>;

export default meta;

type Stroy = StoryObj<typeof Combobox>;

export const Default: Stroy = {};

export const Disabled: Stroy = {
  args: { disabled: true },
};

export const Invalid: Stroy = {
  args: { "aria-invalid": true },
};
