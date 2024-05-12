import { useCallback, useEffect } from "react";
import { VendorAPI } from "../../api";
import { useNotificationsActions } from "../../features/notifications/notificationsSlice";
import { useAPI } from "../../hooks/useAPI";
import { useURLSearchParams } from "../../hooks/useURLSearchParams";
import { SearchParamKeys } from "../../utils/RouteHelper";
import styles from "./UpdateVendorEmail.module.scss";
import { FormikSubmit } from "../../utils/FormikUtils";
import CustomFormik from "../../components/CustomFormik/CustomFormik";
import FormField from "../../components/FormField/FormField";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import { SpaceBetween } from "../../components/SpaceBetween/SpaceBetween";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { Form } from "formik";
import { updateVendorEmailSchema } from "@project-utk/shared/src/schemas/vendor/updateVendorEmailSchema";
import CustomFormikProvider from "../../components/CustomFormik/CustomFormikContext";

enum Field {
  Password = "password",
}

type Values = Record<Field, string>;

function UpdateVendorEmail() {
  const { addError } = useNotificationsActions();
  const { token } = useURLSearchParams<SearchParamKeys.Token>();
  const { fetchAPI: updateEmail } = useAPI(VendorAPI.UpdateVendorEmail);

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

    return await updateEmail({ token, ...values });
  };

  return (
    <SpaceBetween align="center" vertical>
      <CustomFormikProvider>
        <CustomFormik
          initialValues={{ [Field.Password]: "" }}
          onSubmit={handleSubmit}
          validationSchema={updateVendorEmailSchema}
        >
          <Form>
            <SpaceBetween vertical align="center">
              <h1>Update email</h1>

              <FormField name={Field.Password} label="Password">
                <PasswordInput />
              </FormField>

              <SubmitButton>Update email</SubmitButton>
            </SpaceBetween>
          </Form>
        </CustomFormik>
      </CustomFormikProvider>
    </SpaceBetween>
  );
}

export default UpdateVendorEmail;
