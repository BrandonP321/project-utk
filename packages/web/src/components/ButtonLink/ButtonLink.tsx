import { SomeRequired } from "@project-utk/shared/src/utils";
import styles from "./ButtonLink.module.scss";
import React from "react";
import { ClassesProp } from "../../utils/UtilityTypes";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { HTMLAnchorProps } from "../../utils/HTMLAttributes";
import Button from "../Button/Button";

namespace ButtonLink {
  export type Props = SomeRequired<HTMLAnchorProps, "href"> & {
    variant?: Button.Variant;
    classes?: ClassesProp<"root">;
  };
}

function ButtonLink(props: ButtonLink.Props) {
  const {
    children,
    referrerPolicy = "no-referrer",
    classes,
    variant = "primary",
    href,
    ...rest
  } = props;

  return (
    <Link
      {...rest}
      {...{ referrerPolicy }}
      to={href}
      className={classNames(
        styles.button,
        classes?.root,
        styles.buttonLink,
        styles[variant],
      )}
    >
      {children}
    </Link>
  );
}

export default ButtonLink;
