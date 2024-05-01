import { registerVendorSchema } from "@project-utk/shared/src/schemas/vendor/registerVendorSchema";
import CustomFormik from "../../../components/CustomFormik/CustomFormik";
import { SpaceBetween } from "../../../components/SpaceBetween/SpaceBetween";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import { Form } from "formik";
import FormField from "../../../components/FormField/FormField";
import TextInput from "../../../components/TextInput/TextInput";
import { FormikSubmit } from "../../../utils/FormikUtils";
import { VendorAPI } from "../../../api";
import { RouteHelper, SearchParamKeys } from "../../../utils/RouteHelper";
import { useURLSearchParams } from "../../../hooks/useURLSearchParams";
import { useState } from "react";
import { useAppDispatch } from "../../../hooks";
import { Actions } from "../../../features";

enum Field {
  Name = "name",
  Email = "email",
  Password = "password",
  ConfirmPassword = "confirmPassword",
}

export type Values = Record<Field, string>;

export const initialValues: Values = {
  [Field.Name]: "",
  [Field.Email]: "",
  [Field.Password]: "",
  [Field.ConfirmPassword]: "",
};

namespace RegisterVendorForm {
  export type Props = {};
}

function RegisterVendorForm(props: RegisterVendorForm.Props) {
  const dispatch = useAppDispatch();
  const { redirectTo } = useURLSearchParams<SearchParamKeys.RedirectTo>();

  const [formEmailError, setFormEmailError] = useState("");

  const handleSubmit: FormikSubmit<Values> = async (values) => {
    setFormEmailError("");

    return await VendorAPI.RegisterVendor(values, {
      onSuccess: (res) => {
        window.location.href = redirectTo ?? RouteHelper.Home();
      },
      onFailure: (err) => {
        switch (err.errCode) {
          case "EMAIL_ALREADY_EXISTS":
            return setFormEmailError(err.msg);
          default:
            return dispatch(Actions.Notifications.addError({ msg: err.msg }));
        }
      },
    });
  };

  return (
    <CustomFormik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={registerVendorSchema}
    >
      <Form>
        <SpaceBetween vertical stretch align="center">
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
        </SpaceBetween>
      </Form>
    </CustomFormik>
  );
}

export default RegisterVendorForm;
