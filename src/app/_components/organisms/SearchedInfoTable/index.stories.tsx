import { Meta, StoryObj } from "@storybook/react";

import { SearchedInfoTable } from "./index";

const meta = {
  title: "Organisms/SearchedInfoTable",
  component: SearchedInfoTable,
  tags: ["autodocs"],
} satisfies Meta<typeof SearchedInfoTable>;

export default meta;

type Story = StoryObj<typeof SearchedInfoTable>;

export const Default: Story = {
  args: {
    unit: "円",
  },
};
