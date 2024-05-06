import { registerVendorSchema } from "@project-utk/shared/src/schemas/vendor/registerVendorSchema";
import CustomFormik from "../../../components/CustomFormik/CustomFormik";
import { SpaceBetween } from "../../../components/SpaceBetween/SpaceBetween";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import { Form } from "formik";
import FormField from "../../../components/FormField/FormField";
import TextInput from "../../../components/TextInput/TextInput";
import { FormikSubmit, FormikUtils } from "../../../utils/FormikUtils";
import { VendorAPI } from "../../../api";
import { useState } from "react";
import { useAPI } from "../../../hooks/useAPI";
import { useNotificationsActions } from "../../../features/notifications/notificationsSlice";

enum Field {
  Name = "name",
  Email = "email",
  Password = "password",
  ConfirmPassword = "confirmPassword",
}

type Values = Record<Field, string>;

const initialValues: Values = FormikUtils.enumToTextInputInitialValues(Field);

namespace RegisterVendorForm {
  export type Props = { onAuthSuccess: () => void; toggleForm: () => void };
}

function RegisterVendorForm({
  onAuthSuccess,
  toggleForm,
}: RegisterVendorForm.Props) {
  const { addError } = useNotificationsActions();
  const [formEmailError, setFormEmailError] = useState("");

  const { fetchAPI: registerVendor } = useAPI(VendorAPI.RegisterVendor, {
    onSuccess: onAuthSuccess,
    onFailure: (err) => {
      switch (err.errCode) {
        case "EMAIL_ALREADY_EXISTS":
          return setFormEmailError(err.msg);
        default:
          return addError({ msg: err.msg });
      }
    },
  });

  const handleSubmit: FormikSubmit<Values> = async (values) => {
    setFormEmailError("");

    return await registerVendor(values);
  };

  return (
    <CustomFormik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={registerVendorSchema}
    >
      <Form>
        <SpaceBetween vertical stretch align="center">
          <h1>Register</h1>

          <FormField name={Field.Name} label="Name">
            <TextInput name={Field.Name} />
          </FormField>
          <FormField name={Field.Email} label="Email" errorMsg={formEmailError}>
            <TextInput name={Field.Email} />
          </FormField>
          <FormField name={Field.Password} label="Password">
            <TextInput name={Field.Password} type="password" />
          </FormField>
          <FormField name={Field.ConfirmPassword} label="Confirm Password">
            <TextInput name={Field.ConfirmPassword} type="password" />
          </FormField>

          <SubmitButton>Register</SubmitButton>

          <p>
            Already have an account?{" "}
            <button type="button" onClick={toggleForm}>
              Login
            </button>
          </p>
        </SpaceBetween>
      </Form>
    </CustomFormik>
  );
}

export default RegisterVendorForm;
