import { Meta, StoryObj } from "@storybook/react";
import ButtonLink from "./ButtonLink";

const meta: Meta<typeof ButtonLink> = {
  title: "UI Components/ButtonLink",
  component: ButtonLink,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {
    href: "/some-page",
    children: "Click me!",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
