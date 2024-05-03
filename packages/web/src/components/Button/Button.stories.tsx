import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A button component.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    onClick: {
      action: "Clicked",
      description: "Button click event handler.",
      type: { required: true, name: "function" },
    },
    children: { control: "text", description: "Button text content." },
    type: {
      control: "select",
      options: ["button", "submit"],
      type: "string",
      description: "HTML button type attribute.",
      table: {
        type: { summary: "string" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      type: "boolean",
      description: "Whether the button is disabled.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
  args: {
    children: "Click me!",
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
