import { Meta, StoryObj } from "@storybook/react";

import { SearchedInfo } from "./index";

const meta = {
  title: "Atoms/SearchedInfo",
  component: SearchedInfo,
  tags: ["autodocs"],
} satisfies Meta<typeof SearchedInfo>;

export default meta;

type Stroy = StoryObj<typeof SearchedInfo>;

export const Default: Stroy = {
  args: {
    value: 40000,
    unit: "円",
    title: "現在価格",
  },
};
