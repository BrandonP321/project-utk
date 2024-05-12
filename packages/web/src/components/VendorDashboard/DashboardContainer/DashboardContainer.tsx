import classNames from "classnames";
import { ClassesProp } from "../../../utils/UtilityTypes";
import { SpaceBetween } from "../../SpaceBetween/SpaceBetween";
import styles from "./DashboardContainer.module.scss";

namespace DashboardContainer {
  export type Props = React.PropsWithChildren<{
    title?: string;
    classes?: ClassesProp<"root">;
  }>;
}

function DashboardContainer({
  title,
  classes,
  children,
}: DashboardContainer.Props) {
  return (
    <SpaceBetween
      classes={{ root: classNames(styles.container, classes?.root) }}
      size="n"
      vertical
      stretchChildren
    >
      <SpaceBetween classes={{ root: styles.header }}>
        <p className={styles.title}>{title}</p>
      </SpaceBetween>
      <div className={styles.content}>{children}</div>
    </SpaceBetween>
  );
}

export default DashboardContainer;
