import { Form } from "formik";
import { VendorAPI } from "../../api";
import CustomFormik from "../../components/CustomFormik/CustomFormik";
import { SpaceBetween } from "../../components/SpaceBetween/SpaceBetween";
import { useAPI } from "../../hooks/useAPI";
import { FormikSubmit } from "../../utils/FormikUtils";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import FormField from "../../components/FormField/FormField";
import TextInput from "../../components/TextInput/TextInput";
import { requestVendorPasswordResetSchema } from "@project-utk/shared/src/schemas/vendor/requestVendorPasswordResetSchema";
import styles from "./RequestVendorPasswordReset.module.scss";

enum Field {
  Email = "email",
}

type Values = Record<Field, string>;

function RequestVendorPasswordReset() {
  const { fetchAPI: requestReset } = useAPI(VendorAPI.RequestPasswordReset);

  const handleSubmit: FormikSubmit<Values> = requestReset;

  return (
    <SpaceBetween vertical align="center">
      <h1>Request Password Reset</h1>
      <CustomFormik
        initialValues={{ [Field.Email]: "" }}
        onSubmit={handleSubmit}
        validationSchema={requestVendorPasswordResetSchema}
      >
        <Form>
          <SpaceBetween vertical stretch>
            <FormField name={Field.Email} label="Email">
              <TextInput name={Field.Email} />
            </FormField>
            <SubmitButton>Request Reset</SubmitButton>
          </SpaceBetween>
        </Form>
      </CustomFormik>
    </SpaceBetween>
  );
}

export default RequestVendorPasswordReset;
