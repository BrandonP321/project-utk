import classNames from "classnames";
import { ClassesProp } from "../../utils/UtilityTypes";
import styles from "./Button.module.scss";
import React from "react";
import { TypedOmit } from "@project-utk/shared/src/utils";

type HTMLButtonProps = TypedOmit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
>;

namespace Button {
  export type Props = HTMLButtonProps & {
    classes?: ClassesProp<"root">;
  };
}

function Button({ classes, ...rest }: Button.Props) {
  return (
    <button className={classNames(styles.button, classes?.root)} {...rest} />
  );
}

export default Button;
