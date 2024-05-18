import { useEffect } from "react";
import styles from "./CreateListing.module.scss";
import { useLoading } from "../../components/LoadingContainer/useLoading";
import CustomFormikProvider from "../../components/CustomFormik/CustomFormikContext";
import CustomFormik from "../../components/CustomFormik/CustomFormik";
import { vendorListingCreationSchema } from "@project-utk/shared/src/schemas/vendorListing/vendorListingSchema";
import { FormikSubmit, FormikUtils } from "../../utils/FormikUtils";
import { useAPI } from "../../hooks/useAPI";
import { VendorListingAPI } from "../../api/VendorListingAPI";
import { useNavigate } from "react-router-dom";
import { Form } from "formik";
import FormFieldsSpacer from "../../components/FormFieldsSpacer/FormFieldsSpacer";
import FormField from "../../components/FormField/FormField";
import TextInput from "../../components/TextInput/TextInput";
import FormActions from "../../components/FormActions/FormActions";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { RouteHelper } from "../../utils/RouteHelper";

enum Field {
  Name = "name",
}

type Values = Record<Field, string>;

const initialValues: Values = FormikUtils.enumToTextInputInitialValues(Field);

namespace CreateListing {
  export type Props = {};
}

function CreateListingContent(props: CreateListing.Props) {
  const { stopLoading } = useLoading();
  const navigate = useNavigate();

  const { fetchAPI: createListing } = useAPI(
    VendorListingAPI.CreateVendorListing,
    {
      onSuccess: (res) =>
        navigate(
          RouteHelper.ListingEditorBasicInfo({
            urlParams: { listingId: res.listingId },
          }),
        ),
    },
  );

  useEffect(() => {
    stopLoading();
  }, []);

  const handleSubmit: FormikSubmit<Values> = async (values) => {
    await createListing(values);
  };

  return (
    <CustomFormik
      validationSchema={vendorListingCreationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormFieldsSpacer>
          <FormField name={Field.Name} label="Name">
            <TextInput placeholder="Enter listing name" />
          </FormField>
        </FormFieldsSpacer>
        <FormActions>
          <SubmitButton>Create Listing</SubmitButton>
        </FormActions>
      </Form>
    </CustomFormik>
  );
}

export default function CreateListing() {
  return (
    <CustomFormikProvider>
      <CreateListingContent />
    </CustomFormikProvider>
  );
}
