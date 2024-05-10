import classNames from "classnames";
import styles from "./Text.module.scss";

namespace Text {
  export type Props = React.HTMLAttributes<any> & {
    /** Text variant (e.g. h1, h2, p, etc.) */
    v?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
    stretch?: boolean;
    align?: "left" | "center" | "right";
  };
}

function Text({
  v: Tag = "p",
  className,
  stretch,
  align = "left",
  ...rest
}: Text.Props) {
  return (
    <Tag
      {...rest}
      className={classNames(
        styles.text,
        className,
        stretch && styles.stretch,
        styles[`align-${align}`],
      )}
    />
  );
}

export default Text;
