import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styles from "./SidebarLink.module.scss";
import ButtonLink from "../ButtonLink/ButtonLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMatch } from "react-router-dom";
import classNames from "classnames";

namespace SidebarLink {
  export type Props = {
    label: string;
    href: string;
    icon: IconProp;
  };
}

function SidebarLink(props: SidebarLink.Props) {
  const { icon, href, label } = props;

  const isMatch = useMatch(href);

  return (
    <ButtonLink
      href={href}
      classes={{ root: classNames(styles.link, isMatch && styles.active) }}
      variant="custom"
    >
      <FontAwesomeIcon icon={icon} className={styles.icon} /> {label}
    </ButtonLink>
  );
}

export default SidebarLink;
