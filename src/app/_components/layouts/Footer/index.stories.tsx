import { Meta, StoryObj } from "@storybook/react";

import { Footer } from "./index";

const meta = {
  title: "Layouts/Footer",
  component: Footer,
  tags: ["autodocs"],
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
  },
};

export const ForeignActive: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/foreign-stocks",
      },
    },
  },
};

export const YenGraphActive: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/yen-graph",
      },
    },
  },
};

export const DollarGraphActive: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/dollar-grap",
      },
    },
  },
};
