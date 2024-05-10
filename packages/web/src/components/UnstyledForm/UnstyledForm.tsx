import { Form } from "formik";
import styles from "./UnstyledForm.module.scss";
import { ClassesProp } from "../../utils/UtilityTypes";
import classNames from "classnames";

namespace UnstyledForm {
  export type Props = React.PropsWithChildren<{
    classes?: ClassesProp<"root">;
    size?: "n" | "s" | "m" | "l";
  }>;
}

function UnstyledForm({ classes, size = "s", ...rest }: UnstyledForm.Props) {
  return (
    <Form
      className={classNames(styles.form, classes?.root, styles[size])}
      {...rest}
    />
  );
}

export default UnstyledForm;
