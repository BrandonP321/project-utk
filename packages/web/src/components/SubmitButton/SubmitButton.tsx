import { TypedOmit } from "@project-utk/shared/src/utils";
import Button from "../Button/Button";
import { useCustomFormik } from "../CustomFormik/useCustomForm";
import { useFormikContext } from "formik";

namespace SubmitButton {
  export type Props = TypedOmit<Button.Props, "type"> & {};
}

function SubmitButton({
  disabled = false,
  children,
  ...rest
}: SubmitButton.Props) {
  const { isFormDisabled } = useCustomFormik();
  const { dirty, isSubmitting } = useFormikContext();

  return (
    <Button
      {...rest}
      type={"submit"}
      disabled={disabled || isFormDisabled || !dirty || isSubmitting}
    >
      {isSubmitting ? "Loading..." : children}
    </Button>
  );
}

export default SubmitButton;
