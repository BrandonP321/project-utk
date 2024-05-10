import classNames from "classnames";
import { SpaceBetween } from "../SpaceBetween/SpaceBetween";
import styles from "./FormActions.module.scss";

namespace FormActions {
  export type Props = SpaceBetween.Props & {};
}

function FormActions({ classes, ...rest }: FormActions.Props) {
  return (
    <SpaceBetween
      size="m"
      justify="end"
      stretch
      classes={{ root: classNames(styles.actions, classes?.root), ...classes }}
      {...rest}
    />
  );
}

export default FormActions;
