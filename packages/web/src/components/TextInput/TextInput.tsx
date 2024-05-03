import { useCustomFormik } from "../CustomFormik/useCustomForm";
import { useFormField } from "../FormField/useFormField";
import { useField } from "formik";
import styles from "./TextInput.module.scss";
import { ClassesProp } from "../../utils/UtilityTypes";
import classNames from "classnames";
import { TypedOmit } from "@project-utk/shared/src/utils";

namespace TextInput {
  export type Props<F> = TypedOmit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "className"
  > & {
    formatValue?: (value: string) => F;
    parseValue?: (value: F) => string;
    classes?: ClassesProp<"input">;
  };
}

function TextInput<F>(props: TextInput.Props<F>) {
  const { formatValue, parseValue, classes, ...rest } = props;

  const { isFormDisabled } = useCustomFormik();
  const { name, id } = useFormField();
  const [field, , helpers] = useField(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const finalValue = formatValue ? formatValue(value) : value;

    helpers.setValue(finalValue);
  };

  const value = parseValue ? parseValue(field.value) : field.value;

  return (
    <input
      className={classNames(styles.input, classes?.input)}
      {...field}
      {...rest}
      id={id}
      value={value}
      disabled={isFormDisabled}
      onChange={handleChange}
    />
  );
}

export default TextInput;
