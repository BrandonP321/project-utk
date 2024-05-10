import classNames from "classnames";
import { ClassesProp } from "../../utils/UtilityTypes";
import styles from "./Button.module.scss";
import React from "react";
import { TypedOmit } from "@project-utk/shared/src/utils";
import { SpaceBetween } from "../SpaceBetween/SpaceBetween";
import Spinner from "../Spinner/Spinner";

type HTMLButtonProps = TypedOmit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
>;

namespace Button {
  export type Props = HTMLButtonProps & {
    classes?: ClassesProp<"root">;
    loading?: boolean;
  };
}

function Button({
  classes,
  type = "button",
  children,
  loading,
  disabled,
  ...rest
}: Button.Props) {
  return (
    <button
      className={classNames(
        styles.button,
        classes?.root,
        loading && styles.loading,
      )}
      type={type}
      disabled={disabled || loading}
      {...rest}
    >
      <span className={styles.text}>{children}</span>
      <SpaceBetween
        classes={{ root: styles.spinnerWrapper }}
        stretch
        justify="center"
        align="center"
      >
        <Spinner />
      </SpaceBetween>
    </button>
  );
}

export default Button;
