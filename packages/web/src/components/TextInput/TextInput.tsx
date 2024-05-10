import { useCustomFormik } from "../CustomFormik/useCustomForm";
import { useFormField } from "../FormField/useFormField";
import { useField } from "formik";
import styles from "./TextInput.module.scss";
import { ClassesProp } from "../../utils/UtilityTypes";
import classNames from "classnames";
import { TypedOmit } from "@project-utk/shared/src/utils";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { SpaceBetween } from "../SpaceBetween/SpaceBetween";

interface WithRightIconProps {
  rightIcon: IconProp;
  onRightIconClick: () => void;
}

interface WithoutRightIconProps {
  rightIcon?: never;
  onRightIconClick?: never;
}

namespace TextInput {
  export type Props<F> = TypedOmit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "className"
  > & {
    formatValue?: (value: string) => F;
    parseValue?: (value: F) => string;
    classes?: ClassesProp<"root" | "input">;
  } & (WithRightIconProps | WithoutRightIconProps);
}

function TextInput<F>(props: TextInput.Props<F>) {
  const {
    formatValue,
    parseValue,
    classes,
    rightIcon,
    onRightIconClick,
    ...rest
  } = props;

  const { isFormDisabled } = useCustomFormik();
  const { name, id, hasError } = useFormField();
  const [field, , helpers] = useField(name);

  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const finalValue = formatValue ? formatValue(value) : value;

    helpers.setValue(finalValue);
  };

  const value = parseValue ? parseValue(field.value) : field.value;

  return (
    <SpaceBetween
      wrap={false}
      size="n"
      classes={{
        root: classNames(
          styles.inputWrapper,
          classes?.root,
          hasError && styles.error,
          isFocused && styles.focus,
        ),
      }}
    >
      <input
        className={classNames(styles.input, classes?.input)}
        {...field}
        {...rest}
        id={id}
        value={value}
        disabled={isFormDisabled}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {rightIcon && (
        <button
          className={styles.rightIconBtn}
          onClick={onRightIconClick}
          type="button"
        >
          <FontAwesomeIcon icon={rightIcon} />
        </button>
      )}
    </SpaceBetween>
  );
}

export default TextInput;
