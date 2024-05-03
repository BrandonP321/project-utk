import { useFormikContext } from "formik";
import styles from "./FormField.module.scss";
import { FormFieldContext } from "./FormFieldContext";
import { ClassesProp } from "../../utils/UtilityTypes";
import classNames from "classnames";
import { SpaceBetween } from "../SpaceBetween/SpaceBetween";
import { useUniqueId } from "../../hooks/useUniqueId";

namespace FormField {
  export type Props = React.PropsWithChildren<{
    name: string;
    label?: string;
    errorMsg?: string;
    classes?: ClassesProp<"root" | "label" | "error">;
  }>;
}

function FormField<Values extends Record<string, string>>(
  props: FormField.Props,
) {
  const { name, children, label, classes, errorMsg } = props;

  const { errors } = useFormikContext<Record<string, string>>();
  const inputId = useUniqueId(name);

  const error = errorMsg || errors[name];

  return (
    <SpaceBetween
      classes={{ root: classNames(styles.field, classes?.root) }}
      size="xxs"
      vertical
    >
      {label && (
        <label
          className={classNames(styles.label, classes?.label)}
          htmlFor={inputId}
        >
          {label}
        </label>
      )}

      <FormFieldContext.Provider value={{ name, error, id: inputId }}>
        {children}
      </FormFieldContext.Provider>

      {error && (
        <p className={classNames(styles.error, classes?.root)}>{error}</p>
      )}
    </SpaceBetween>
  );
}

export default FormField;
