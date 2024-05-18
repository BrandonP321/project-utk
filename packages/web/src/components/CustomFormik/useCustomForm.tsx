import { useContext } from "react";
import { customFormikContext } from "./CustomFormikContext";

export function useCustomFormik() {
  const context = useContext(customFormikContext);

  const { setIsFormDisabled, isFormDisabled } = context;

  const toggleFormDisabled = () => {
    setIsFormDisabled(!isFormDisabled);
  };

  const disableForm = () => setIsFormDisabled(true);

  const enableForm = () => setIsFormDisabled(false);

  return { ...context, toggleFormDisabled, disableForm, enableForm };
}
