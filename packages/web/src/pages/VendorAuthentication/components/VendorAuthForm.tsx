import FormActions from "../../../components/FormActions/FormActions";
import FormFieldsSpacer from "../../../components/FormFieldsSpacer/FormFieldsSpacer";
import { SpaceBetween } from "../../../components/SpaceBetween/SpaceBetween";
import UnstyledForm from "../../../components/UnstyledForm/UnstyledForm";
import styles from "./VendorAuthForm.module.scss";
import Text from "../../../components/Text/Text";

namespace VendorAuthForm {
  export type Props = {
    title: string;
    formFields: React.ReactNode;
    formActions: React.ReactNode;
    formToggle: React.ReactNode;
  };
}

function VendorAuthForm({
  formActions,
  formFields,
  formToggle,
  title,
}: VendorAuthForm.Props) {
  return (
    <UnstyledForm>
      <Text v="h1" align="center">
        {title}
      </Text>
      <FormFieldsSpacer>{formFields}</FormFieldsSpacer>

      <SpaceBetween align="center" vertical>
        <FormActions>{formActions}</FormActions>

        {formToggle}
      </SpaceBetween>
    </UnstyledForm>
  );
}

export default VendorAuthForm;
