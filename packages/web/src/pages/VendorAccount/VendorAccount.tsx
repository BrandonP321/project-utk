import { updateVendorSchema } from "@project-utk/shared/src/schemas/vendor/updateVendorSchema";
import CustomFormik from "../../components/CustomFormik/CustomFormik";
import styles from "./VendorAccount.module.scss";
import { FormikSubmit, FormikUtils } from "../../utils/FormikUtils";
import { useEffect, useState } from "react";
import { VendorAPI } from "../../api";
import { useAuthVendor } from "../../features/authVendor/useAuthVendor";
import { Form } from "formik";
import FormField from "../../components/FormField/FormField";
import TextInput from "../../components/TextInput/TextInput";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { SpaceBetween } from "../../components/SpaceBetween/SpaceBetween";
import Button from "../../components/Button/Button";
import { useAPI } from "../../hooks/useAPI";
import { useAuthVendorActions } from "../../features/authVendor/authVendorSlice";
import { useModal } from "../../components/Modal/useModal";
import VendorEmailUpdateModal from "./components/VendorEmailUpdateModal";

enum Field {
  Name = "name",
}

type Values = Record<Field, string>;

function VendorAccount() {
  const actions = useAuthVendorActions();
  const { modalProps, toggleModal } = useModal();
  const { vendor, fetchAndUpdateVendor } = useAuthVendor();
  const [initialValues, setInitialValues] = useState<Values>(
    FormikUtils.enumToTextInputInitialValues(Field),
  );

  const { fetchAPI: updateVendor } = useAPI(VendorAPI.UpdateVendor);

  const handleSubmit: FormikSubmit<Values> = async (values) => {
    await updateVendor(values);
    actions.updateVendor({ vendor: values });
  };

  useEffect(() => {
    fetchAndUpdateVendor();
  }, []);

  useEffect(() => {
    if (vendor) {
      setInitialValues(vendor);
    }
  }, [vendor]);

  const sendVerificationEmail = async () => {
    return await VendorAPI.SendVerificationEmail({});
  };

  return (
    <div>
      <p>
        Verification status:{" "}
        {vendor?.isEmailVerified ? "verified" : "not verified"}
      </p>
      <Button onClick={sendVerificationEmail}>Send verification email</Button>
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

      <p>
        <strong>Email:</strong> {vendor?.email}
      </p>
      <Button onClick={toggleModal}>Update Email</Button>

      <VendorEmailUpdateModal {...modalProps} />
    </div>
  );
}

export default VendorAccount;
