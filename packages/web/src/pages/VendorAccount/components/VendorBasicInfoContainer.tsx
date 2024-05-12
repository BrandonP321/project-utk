import { updateVendorSchema } from "@project-utk/shared/src/schemas/vendor/updateVendorSchema";
import { Form } from "formik";
import CustomFormik from "../../../components/CustomFormik/CustomFormik";
import EditFormButton from "../../../components/EditFormButton/EditFormButton";
import FormActions from "../../../components/FormActions/FormActions";
import FormField from "../../../components/FormField/FormField";
import FormFieldsSpacer from "../../../components/FormFieldsSpacer/FormFieldsSpacer";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import TextInput from "../../../components/TextInput/TextInput";
import DashboardContainer from "../../../components/VendorDashboard/DashboardContainer/DashboardContainer";
import { useState, useEffect } from "react";
import { VendorAPI } from "../../../api";
import { useAuthVendorActions } from "../../../features/authVendor/authVendorSlice";
import { useAuthVendor } from "../../../features/authVendor/useAuthVendor";
import { useAPI } from "../../../hooks/useAPI";
import { FormikUtils, FormikSubmit } from "../../../utils/FormikUtils";
import CustomFormikProvider from "../../../components/CustomFormik/CustomFormikContext";

enum Field {
  Name = "name",
}

type Values = Record<Field, string>;

namespace VendorBasicInfoContainer {
  export type Props = {};
}

function VendorBasicInfoContainer(props: VendorBasicInfoContainer.Props) {
  const actions = useAuthVendorActions();
  const { vendor, fetchAndUpdateVendor } = useAuthVendor();
  const [initialValues, setInitialValues] = useState<Values>(
    FormikUtils.enumToTextInputInitialValues(Field),
  );

  const { fetchAPI: updateVendor } = useAPI(VendorAPI.UpdateVendor, {
    onSuccess: (_, req) => actions.updateVendor({ vendor: req }),
  });

  const handleSubmit: FormikSubmit<Values> = updateVendor;

  useEffect(() => {
    fetchAndUpdateVendor();
  }, []);

  useEffect(() => {
    if (vendor) {
      setInitialValues(vendor);
    }
  }, [vendor]);

  return (
    <DashboardContainer title="Basic Information">
      <CustomFormikProvider isFormDisabledDefault>
        <CustomFormik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={updateVendorSchema}
        >
          <Form>
            <FormFieldsSpacer>
              <FormField name={Field.Name} label="Name">
                <TextInput name={Field.Name} />
              </FormField>
            </FormFieldsSpacer>

            <FormActions>
              <EditFormButton />
              <SubmitButton>Save</SubmitButton>
            </FormActions>
          </Form>
        </CustomFormik>
      </CustomFormikProvider>
    </DashboardContainer>
  );
}

export default VendorBasicInfoContainer;
