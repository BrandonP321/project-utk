import { useContext } from "react";
import { FormFieldContext } from "./FormFieldContext";

export const useFormField = () => {
  const context = useContext(FormFieldContext);

  return {
    ...context,
    hasError: !!context.error,
  };
};
