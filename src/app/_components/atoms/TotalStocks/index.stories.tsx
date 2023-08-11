import { Meta } from "@storybook/react";

import { CardWrapper } from "../CardWrapper";
import { TotalStocks } from "./index";

const meta = {
  title: "Atoms/TotalStocks",
  component: TotalStocks,
  tags: ["autodocs"],
} satisfies Meta<typeof TotalStocks>;

export default meta;

const Template = () => (
  <CardWrapper>
    <TotalStocks unit="円" total={300000000} />
  </CardWrapper>
);

export const Default = Template.bind({});
