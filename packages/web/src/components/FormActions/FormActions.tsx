import classNames from "classnames";
import { SpaceBetween } from "../SpaceBetween/SpaceBetween";
import styles from "./FormActions.module.scss";

namespace FormActions {
  export type Props = SpaceBetween.Props & {
    noSpacer?: boolean;
  };
}

function FormActions({
  classes,
  noSpacer = false,
  ...rest
}: FormActions.Props) {
  return (
    <SpaceBetween
      size="m"
      justify="end"
      stretch
      classes={{
        root: classNames(
          styles.actions,
          classes?.root,
          noSpacer && styles.noSpacer,
        ),
        ...classes,
      }}
      {...rest}
    />
  );
}

export default FormActions;
