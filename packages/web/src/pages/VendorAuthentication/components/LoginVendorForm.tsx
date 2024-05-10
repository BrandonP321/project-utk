import { Form } from "formik";
import CustomFormik from "../../../components/CustomFormik/CustomFormik";
import styles from "./LoginVendorForm.module.scss";
import { SpaceBetween } from "../../../components/SpaceBetween/SpaceBetween";
import FormField from "../../../components/FormField/FormField";
import TextInput from "../../../components/TextInput/TextInput";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import { FormikSubmit, FormikUtils } from "../../../utils/FormikUtils";
import { VendorAPI } from "../../../api";
import PasswordInput from "../../../components/PasswordInput/PasswordInput";
import { useAPI } from "../../../hooks/useAPI";
import { loginVendorSchema } from "@project-utk/shared/src/schemas/vendor/loginVendorSchema";
import InlineLink from "../../../components/InlineLink/InlineLink";
import Text from "../../../components/Text/Text";

enum Field {
  Email = "email",
  Password = "password",
}

type Values = Record<Field, string>;

const initialValues: Values = FormikUtils.enumToTextInputInitialValues(Field);

namespace LoginVendorForm {
  export type Props = { onAuthSuccess: () => void; toggleForm: () => void };
}

function LoginVendorForm({ onAuthSuccess, toggleForm }: LoginVendorForm.Props) {
  const { fetchAPI: login } = useAPI(VendorAPI.LoginVendor, {
    onSuccess: onAuthSuccess,
  });

  const handleSubmit: FormikSubmit<Values> = login;

  return (
    <CustomFormik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginVendorSchema}
    >
      <Form>
        <SpaceBetween vertical stretch align="center">
          <h1>Login</h1>

          <FormField name={Field.Email} label="Email">
            <TextInput placeholder="Enter your email" />
          </FormField>
          <FormField
            name={Field.Password}
            label="Password"
            helpLink={PasswordInput.FormFieldHelpLink}
          >
            <PasswordInput placeholder="Enter your password" />
          </FormField>

          <SubmitButton>Login</SubmitButton>

          <Text align="center">
            Don't have an account?{" "}
            <InlineLink role="button" onClick={toggleForm}>
              Create an account
            </InlineLink>
          </Text>
        </SpaceBetween>
      </Form>
    </CustomFormik>
  );
}

export default LoginVendorForm;
