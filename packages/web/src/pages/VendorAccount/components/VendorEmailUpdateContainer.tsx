import { useEffect, useState } from "react";
import { VendorAPI } from "../../../api";
import { useAPI } from "../../../hooks/useAPI";
import { FormikSubmit, FormikUtils } from "../../../utils/FormikUtils";
import CustomFormik from "../../../components/CustomFormik/CustomFormik";
import { requestVendorEmailUpdateSchema } from "@project-utk/shared/src/schemas/vendor/requestVendorEmailUpdateSchema";
import { Form } from "formik";
import FormField from "../../../components/FormField/FormField";
import TextInput from "../../../components/TextInput/TextInput";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import CustomFormikProvider from "../../../components/CustomFormik/CustomFormikContext";
import DashboardContainer from "../../../components/VendorDashboard/DashboardContainer/DashboardContainer";
import FormFieldsSpacer from "../../../components/FormFieldsSpacer/FormFieldsSpacer";
import FormActions from "../../../components/FormActions/FormActions";
import { useAuthVendor } from "../../../features/authVendor/useAuthVendor";
import EditFormButton from "../../../components/EditFormButton/EditFormButton";
import { useAuthVendorActions } from "../../../features/authVendor/authVendorSlice";
import { useNotificationsActions } from "../../../features/notifications/notificationsSlice";
import { UpdateVendorEmail } from "@project-utk/shared/src/api/routes";
import { SpaceBetween } from "../../../components/SpaceBetween/SpaceBetween";
import Alert from "../../../components/Alert/Alert";

enum Field {
  Email = "email",
}

type Values = Record<Field, string>;

function VendorEmailUpdateContainer() {
  const actions = useAuthVendorActions();
  const { addSuccess } = useNotificationsActions();
  const { vendor } = useAuthVendor();
  const [showEmailSentAlert, setShowEmailSentAlert] = useState(false);
  const [initialValues, setInitialValues] = useState<Values>(
    FormikUtils.enumToTextInputInitialValues(Field),
  );

  const { fetchAPI: requestEmailUpdate } = useAPI(
    VendorAPI.RequestEmailUpdate,
    {
      onSuccess: (res, req) => {
        if (res.updated) {
          actions.updateVendor({ vendor: req });
          addSuccess({ msg: UpdateVendorEmail.SuccessMsg });
        } else {
          setShowEmailSentAlert(true);
        }
      },
    },
  );

  useEffect(() => {
    vendor && setInitialValues({ email: vendor.email });
  }, [vendor]);

  const handleSubmit: FormikSubmit<Values> = requestEmailUpdate;

  return (
    <DashboardContainer title="Login information">
      <SpaceBetween vertical stretchChildren>
        <Alert title="Email sent" type="success" visible={showEmailSentAlert}>
          We have sent an email to your new address. Please check your inbox and
          follow the instructions to update your email.
        </Alert>

        <CustomFormikProvider isFormDisabledDefault>
          <CustomFormik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={requestVendorEmailUpdateSchema}
          >
            <Form>
              <FormFieldsSpacer>
                <FormField name={Field.Email} label="Email">
                  <TextInput />
                </FormField>
              </FormFieldsSpacer>

              <FormActions>
                <EditFormButton />
                <SubmitButton>Update email</SubmitButton>
              </FormActions>
            </Form>
          </CustomFormik>
        </CustomFormikProvider>
      </SpaceBetween>
    </DashboardContainer>
  );
}

export default VendorEmailUpdateContainer;
