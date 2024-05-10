import { Link } from "react-router-dom";
import { HTMLAnchorProps } from "../../utils/HTMLAttributes";
import styles from "./InlineLink.module.scss";
import { ClassesProp } from "../../utils/UtilityTypes";
import classNames from "classnames";
import { TypedOmit } from "@project-utk/shared/src/utils";

type AnchorProps = TypedOmit<HTMLAnchorProps, "href">;

type WithHref = {
  href: string;
  role?: never;
};

type WithoutHref = {
  href?: never;
  role: "button";
};

namespace InlineLink {
  export type Props = AnchorProps &
    (WithHref | WithoutHref) & {
      allowWrap?: boolean;
      classes?: ClassesProp<"root">;
    };
}

function InlineLink({
  classes,
  href,
  children,
  allowWrap = false,
  ...rest
}: InlineLink.Props) {
  const className = classNames(
    styles.link,
    classes?.root,
    allowWrap && styles.allowWrap,
  );

  return href ? (
    <Link className={className} to={href} {...rest}>
      {children}
    </Link>
  ) : (
    <a className={className} {...rest}>
      {children}
    </a>
  );
}

export default InlineLink;
