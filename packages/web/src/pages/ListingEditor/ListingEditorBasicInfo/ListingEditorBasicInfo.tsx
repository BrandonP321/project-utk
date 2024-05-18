import { Form } from "formik";
import CustomFormik from "../../../components/CustomFormik/CustomFormik";
import CustomFormikProvider from "../../../components/CustomFormik/CustomFormikContext";
import { useListingDetails } from "../../../hooks/vendorListing/useListingDetails";
import styles from "./ListingEditorBasicInfo.module.scss";
import FormFieldsSpacer from "../../../components/FormFieldsSpacer/FormFieldsSpacer";
import { FormikSubmit } from "../../../utils/FormikUtils";
import { useAPI } from "../../../hooks/useAPI";
import { VendorListingAPI } from "../../../api/VendorListingAPI";
import { useParams } from "react-router-dom";
import FormField from "../../../components/FormField/FormField";
import TextInput from "../../../components/TextInput/TextInput";
import FormActions from "../../../components/FormActions/FormActions";
import SubmitButton from "../../../components/SubmitButton/SubmitButton";
import EditFormButton from "../../../components/EditFormButton/EditFormButton";
import { useCustomFormik } from "../../../components/CustomFormik/useCustomForm";

enum Field {
  Name = "name",
}

type Values = Record<Field, string>;

function ListingEditorBasicInfoContent() {
  const { details } = useListingDetails();
  const { listingId } = useParams<"listingId">();
  const { disableForm } = useCustomFormik();

  const { fetchAPI: updateListing } = useAPI(
    VendorListingAPI.UpdateVendorListing,
    { onSuccess: disableForm },
  );

  const handleSubmit: FormikSubmit<Values> = async (values) => {
    await updateListing({ listingId: listingId!, listing: values });
  };

  if (!details) return null;

  return (
    <CustomFormik initialValues={details} onSubmit={handleSubmit}>
      <Form>
        <FormFieldsSpacer>
          <FormField name={Field.Name} label="Name">
            <TextInput placeholder="Enter listing name" />
          </FormField>
        </FormFieldsSpacer>
        <FormActions>
          <EditFormButton />
          <SubmitButton>Save</SubmitButton>
        </FormActions>
      </Form>
    </CustomFormik>
  );
}

export default function ListingEditorBasicInfo() {
  return (
    <CustomFormikProvider isFormDisabledDefault>
      <ListingEditorBasicInfoContent />
    </CustomFormikProvider>
  );
}
