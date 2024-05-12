import { registerVendorSchema } from "@project-utk/shared/src/schemas/vendor/registerVendorSchema";
import CustomFormik from "../../../components/CustomFormik/CustomFormik";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import FormField from "../../../components/FormField/FormField";
import TextInput from "../../../components/TextInput/TextInput";
import { FormikSubmit, FormikUtils } from "../../../utils/FormikUtils";
import { VendorAPI } from "../../../api";
import { useState } from "react";
import { useAPI } from "../../../hooks/useAPI";
import { useNotificationsActions } from "../../../features/notifications/notificationsSlice";
import InlineLink from "../../../components/InlineLink/InlineLink";
import PasswordInput from "../../../components/PasswordInput/PasswordInput";
import Text from "../../../components/Text/Text";
import VendorAuthForm from "./VendorAuthForm";
import CustomFormikProvider from "../../../components/CustomFormik/CustomFormikContext";

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
    <CustomFormikProvider>
      <CustomFormik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={registerVendorSchema}
      >
        <VendorAuthForm
          title="Create account"
          formFields={
            <>
              <FormField name={Field.Name} label="Name">
                <TextInput />
              </FormField>
              <FormField
                name={Field.Email}
                label="Email"
                errorMsg={formEmailError}
              >
                <TextInput />
              </FormField>
              <FormField name={Field.Password} label="Password">
                <PasswordInput />
              </FormField>
              <FormField name={Field.ConfirmPassword} label="Confirm Password">
                <PasswordInput />
              </FormField>
            </>
          }
          formActions={<SubmitButton>Create account</SubmitButton>}
          formToggle={
            <Text align="center">
              Already have an account?{" "}
              <InlineLink role="button" onClick={toggleForm}>
                Login
              </InlineLink>
            </Text>
          }
        />
      </CustomFormik>
    </CustomFormikProvider>
  );
}

export default RegisterVendorForm;
