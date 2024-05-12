import classNames from "classnames";
import { useMostSpecific } from "../../hooks/useMostSpecific";
import { ResponsiveProps } from "../../utils/ResponsiveUtils";
import { ClassesProp } from "../../utils/UtilityTypes";
import styles from "./GridItem.module.scss";

namespace GridItem {
  export type Props = React.PropsWithChildren<{
    classes?: ClassesProp<"root">;
  }> &
    ResponsiveProps<"span", number>;
}

function GridItem({ children, responsiveSpan, span, classes }: GridItem.Props) {
  const activeSpan = useMostSpecific(span, responsiveSpan);

  return (
    <div
      className={classNames(styles.gridItem, classes?.root)}
      style={{ gridColumn: `span ${activeSpan}` }}
    >
      {children}
    </div>
  );
}

export default GridItem;
