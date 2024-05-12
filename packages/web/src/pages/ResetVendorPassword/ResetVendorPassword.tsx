import { useCallback, useEffect } from "react";
import { VendorAPI } from "../../api";
import { useNotificationsActions } from "../../features/notifications/notificationsSlice";
import { useAPI } from "../../hooks/useAPI";
import { useURLSearchParams } from "../../hooks/useURLSearchParams";
import { RouteHelper, SearchParamKeys } from "../../utils/RouteHelper";
import styles from "./ResetVendorPassword.module.scss";
import { FormikSubmit } from "../../utils/FormikUtils";
import { SpaceBetween } from "../../components/SpaceBetween/SpaceBetween";
import CustomFormik from "../../components/CustomFormik/CustomFormik";
import { resetVendorPasswordSchema } from "@project-utk/shared/src/schemas/vendor/resetVendorPasswordSchema";
import { Form } from "formik";
import FormField from "../../components/FormField/FormField";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { useNavigate } from "react-router-dom";
import CustomFormikProvider from "../../components/CustomFormik/CustomFormikContext";

enum Field {
  Password = "password",
  ConfirmPassword = "confirmPassword",
}

type Values = Record<Field, string>;

function ResetVendorPassword() {
  const navigate = useNavigate();
  const { addError } = useNotificationsActions();
  const { token } = useURLSearchParams<SearchParamKeys.Token>();

  const { fetchAPI: resetPassword } = useAPI(VendorAPI.ResetPassword, {
    onSuccess: () => navigate(RouteHelper.VendorLogin()),
  });

  const displayTokenError = useCallback(
    () => addError({ msg: "Invalid link" }),
    [addError],
  );

  useEffect(() => {
    !token && displayTokenError();
  }, [token, displayTokenError]);

  const handleSubmit: FormikSubmit<Values> = async (values) => {
    if (!token) {
      displayTokenError();
      return;
    }

    return await resetPassword({ token, ...values });
  };

  return (
    <SpaceBetween align="center" vertical>
      <CustomFormikProvider>
        <CustomFormik
          initialValues={{ [Field.Password]: "", [Field.ConfirmPassword]: "" }}
          onSubmit={handleSubmit}
          validationSchema={resetVendorPasswordSchema}
        >
          <Form>
            <SpaceBetween vertical align="center">
              <h1>Reset Password</h1>

              <FormField name={Field.Password} label="Password">
                <PasswordInput />
              </FormField>
              <FormField name={Field.ConfirmPassword} label="Confirm Password">
                <PasswordInput />
              </FormField>
              <SubmitButton>Reset Password</SubmitButton>
            </SpaceBetween>
          </Form>
        </CustomFormik>
      </CustomFormikProvider>
    </SpaceBetween>
  );
}

export default ResetVendorPassword;
