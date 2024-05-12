import { Meta, StoryObj } from "@storybook/react";
import FormField from "./FormField";
import CustomFormik from "../CustomFormik/CustomFormik";
import TextInput from "../TextInput/TextInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import CustomFormikProvider from "../CustomFormik/CustomFormikContext";

const fieldName = "field" as const;

const CustomFormikDecorator = (
  props: Partial<CustomFormik.Props<{ [fieldName]: string }>>,
) => (
  <CustomFormikProvider>
    <CustomFormik
      initialValues={{ [fieldName]: "test@email.com" }}
      onSubmit={() => {}}
      {...props}
    />
  </CustomFormikProvider>
);

const FieldChildren = {
  TextInput: () => <TextInput name={fieldName} />,
  PasswordInput: () => <PasswordInput name={fieldName} />,
};

const meta: Meta<typeof FormField> = {
  title: "UI Components/FormField",
  component: FormField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
      description: "The label displayed above the input field.",
      type: { required: true, name: "string" },
    },
    name: {
      control: { type: "text", disable: true },
      description: "The name of the field.",
      type: { required: true, name: "string" },
    },
    children: {
      control: {},
      options: ["Text Input", "Password Input"],
      type: { required: true, name: "other", value: "Text Input" },
      mapping: {
        "Text Input": <FieldChildren.TextInput />,
        "Password Input": <FieldChildren.PasswordInput />,
      },
      description: "The input element to be wrapped by the form field.",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    errorMsg: {
      control: "text",
      description:
        "The error message to display.  If not provided, the error will come from the Formik context.",
    },
  },
  args: {
    label: "Label",
    errorMsg: "",
    name: fieldName,
    children: <FieldChildren.TextInput />,
  },
  decorators: [
    (Story) => (
      <CustomFormikDecorator>
        <Story />
      </CustomFormikDecorator>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithError: Story = {
  args: {},
  decorators: [
    (Story) => (
      <CustomFormikDecorator
        initialErrors={{
          [fieldName]: "This error is coming from the Formik context",
        }}
      >
        <Story />
      </CustomFormikDecorator>
    ),
  ],
};
