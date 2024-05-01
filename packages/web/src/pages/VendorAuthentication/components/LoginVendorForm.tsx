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
  const handleSubmit: FormikSubmit<Values> = async (values) => {
    return await VendorAPI.LoginVendor(values, {
      onSuccess: onAuthSuccess,
    });
  };

  return (
    <CustomFormik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={null}
    >
      <Form>
        <SpaceBetween vertical stretch align="center">
          <h1>Login</h1>

          <FormField name={Field.Email} label="Email">
            <TextInput name={Field.Email} />
          </FormField>
          <FormField name={Field.Password} label="Password">
            <PasswordInput name={Field.Password} />
          </FormField>

          <SubmitButton>Login</SubmitButton>

          <p>
            Don't have an account?{" "}
            <button type="button" onClick={toggleForm}>
              Register
            </button>
          </p>
        </SpaceBetween>
      </Form>
    </CustomFormik>
  );
}

export default LoginVendorForm;
