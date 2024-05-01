import { createContext } from "react";

type TFormFieldContext = {
  name: string;
  id: string;
  error?: string;
};

export const FormFieldContext = createContext({} as TFormFieldContext);
