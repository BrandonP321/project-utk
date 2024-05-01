import { useContext } from "react";
import { customFormikContext } from "./CustomFormikContext";

export function useCustomFormik() {
  const context = useContext(customFormikContext);

  return context;
}
