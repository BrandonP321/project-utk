import { updateVendorSchema } from "@project-utk/shared/src/schemas/vendor/updateVendorSchema";
import CustomFormik from "../../components/CustomFormik/CustomFormik";
import styles from "./VendorAccount.module.scss";
import { FormikSubmit, FormikUtils } from "../../utils/FormikUtils";
import { useEffect, useState } from "react";
import { VendorAPI } from "../../api";
import { useAppDispatch } from "../../hooks";
import { Actions } from "../../features";
import { useAuthVendor } from "../../features/authVendor/useAuthVendor";
import { Form } from "formik";
import FormField from "../../components/FormField/FormField";
import TextInput from "../../components/TextInput/TextInput";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { SpaceBetween } from "../../components/SpaceBetween/SpaceBetween";

enum Field {
  Name = "name",
}

type Values = Record<Field, string>;

function VendorAccount() {
  const dispatch = useAppDispatch();
  const { vendor, fetchAndUpdateVendor, isFetchingAuthVendor } =
    useAuthVendor();
  const [initialValues, setInitialValues] = useState<Values>(
    FormikUtils.enumToTextInputInitialValues(Field)
  );

  const handleSubmit: FormikSubmit<Values> = async (values) => {
    return await VendorAPI.UpdateVendor(values, {
      onSuccess: () => {
        dispatch(Actions.Notifications.addSuccess({ msg: "Account updated" }));
        dispatch(Actions.AuthVendor.updateVendor({ vendor: values }));
      },
    });
  };

  useEffect(() => {
    fetchAndUpdateVendor();
  }, []);

  useEffect(() => {
    if (vendor) {
      setInitialValues(vendor);
    }
  }, [vendor]);

  return (
    <div>
      <CustomFormik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={updateVendorSchema}
      >
        <Form>
          <SpaceBetween vertical stretch align="center">
            <h1>Account</h1>

            <FormField name={Field.Name} label="Name">
              <TextInput name={Field.Name} />
            </FormField>

            <SubmitButton>Save</SubmitButton>
          </SpaceBetween>
        </Form>
      </CustomFormik>
    </div>
  );
}

export default VendorAccount;
