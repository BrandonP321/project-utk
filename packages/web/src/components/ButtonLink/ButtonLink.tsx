import { SomeRequired, TypedOmit } from "@project-utk/shared/src/utils";
import styles from "./ButtonLink.module.scss";
import React from "react";
import { ClassesProp } from "../../utils/UtilityTypes";
import classNames from "classnames";
import { Link } from "react-router-dom";

type HTMLAnchorProps = TypedOmit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "className"
>;

namespace ButtonLink {
  export type Props = SomeRequired<HTMLAnchorProps, "href"> & {
    classes?: ClassesProp<"root">;
  };
}

function ButtonLink(props: ButtonLink.Props) {
  const {
    children,
    referrerPolicy = "no-referrer",
    classes,
    href,
    ...rest
  } = props;

  return (
    <Link
      {...rest}
      {...{ referrerPolicy }}
      to={href}
      className={classNames(styles.button, classes?.root, styles.buttonLink)}
    >
      {children}
    </Link>
  );
}

export default ButtonLink;
