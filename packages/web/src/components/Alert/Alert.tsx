import classNames from "classnames";
import { ClassesProp } from "../../utils/UtilityTypes";
import { SpaceBetween } from "../SpaceBetween/SpaceBetween";
import styles from "./Alert.module.scss";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type AlertType = "info" | "success" | "error";

const AlertIconMap: Record<AlertType, IconProp> = {
  error: faExclamationCircle,
  success: faCheckCircle,
  info: faInfoCircle,
};

namespace Alert {
  export type Props = React.PropsWithChildren<{
    title?: string;
    type?: AlertType;
    visible?: boolean;
    classes?: ClassesProp<"root" | "icon" | "msg" | "title" | "close">;
  }>;
}

function Alert({
  classes,
  children,
  title,
  type = "info",
  visible = true,
}: Alert.Props) {
  const icon = AlertIconMap[type];

  if (!visible) {
    return null;
  }

  return (
    <SpaceBetween
      classes={{ root: classNames(styles.alert, styles[type], classes?.root) }}
      wrap={false}
    >
      <FontAwesomeIcon
        icon={icon}
        className={classNames(styles.icon, classes?.icon)}
      />
      <SpaceBetween size="xs" vertical stretch stretchChildren>
        <p className={classNames(styles.title, classes?.title)}>{title}</p>
        <div>{children}</div>
      </SpaceBetween>
    </SpaceBetween>
  );
}

export default Alert;
