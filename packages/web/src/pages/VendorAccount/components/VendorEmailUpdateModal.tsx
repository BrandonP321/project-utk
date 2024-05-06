import { useEffect, useState } from "react";
import { VendorAPI } from "../../../api";
import Modal from "../../../components/Modal/Modal";
import { useAPI } from "../../../hooks/useAPI";
import { FormikSubmit } from "../../../utils/FormikUtils";
import styles from "./VendorEmailUpdateModal.module.scss";
import CustomFormik from "../../../components/CustomFormik/CustomFormik";
import { requestVendorEmailUpdateSchema } from "@project-utk/shared/src/schemas/vendor/requestVendorEmailUpdateSchema";
import { Form } from "formik";
import { SpaceBetween } from "../../../components/SpaceBetween/SpaceBetween";
import FormField from "../../../components/FormField/FormField";
import TextInput from "../../../components/TextInput/TextInput";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";

enum Field {
  Email = "email",
}

type Values = Record<Field, string>;

namespace VendorEmailUpdateModal {
  export type Props = Modal.ControlProps;
}

function VendorEmailUpdateModal(props: VendorEmailUpdateModal.Props) {
  const { show } = props;

  const [isSuccess, setIsSuccess] = useState(false);

  const { fetchAPI: requestEmailUpdate, error } = useAPI(
    VendorAPI.RequestEmailUpdate,
    { onSuccess: () => setIsSuccess(true) },
  );

  useEffect(() => {
    // Reset form on open
    show && setIsSuccess(false);
  }, [show]);

  const handleSubmit: FormikSubmit<Values> = requestEmailUpdate;

  const status = isSuccess ? "success" : error ? "error" : undefined;

  return (
    <Modal {...props}>
      <CustomFormik
        initialValues={{ [Field.Email]: "" }}
        onSubmit={handleSubmit}
        validationSchema={requestVendorEmailUpdateSchema}
      >
        <Form>
          <SpaceBetween vertical align="center">
            <h1>Update Email</h1>
            <FormField name={Field.Email} label="New email">
              <TextInput />
            </FormField>

            <SubmitButton>Request new email</SubmitButton>

            <p>Status: {status}</p>
            {error && <p>{error.msg}</p>}
          </SpaceBetween>
        </Form>
      </CustomFormik>
    </Modal>
  );
}

export default VendorEmailUpdateModal;
