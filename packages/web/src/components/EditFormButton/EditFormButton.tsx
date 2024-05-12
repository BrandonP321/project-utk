import Button from "../Button/Button";
import { useCustomFormik } from "../CustomFormik/useCustomForm";

namespace EditFormButton {
  export type Props = {
    editText?: string;
    cancelText?: string;
  };
}

function EditFormButton({
  cancelText = "Cancel",
  editText = "Edit",
}: EditFormButton.Props) {
  const { isFormDisabled, toggleFormDisabled } = useCustomFormik();

  return (
    <Button onClick={toggleFormDisabled} variant="secondary">
      {isFormDisabled ? editText : cancelText}
    </Button>
  );
}

export default EditFormButton;
