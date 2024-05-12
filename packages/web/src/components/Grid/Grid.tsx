import classNames from "classnames";
import { useMostSpecific } from "../../hooks/useMostSpecific";
import { ResponsiveProps, Size } from "../../utils/ResponsiveUtils";
import styles from "./Grid.module.scss";

namespace Grid {
  export type Props = React.PropsWithChildren<{}> &
    ResponsiveProps<"gapSize", Size>;
}

function Grid({ children, gapSize = "s", responsiveGapSize }: Grid.Props) {
  const activeGapSize = useMostSpecific(gapSize, responsiveGapSize);

  return (
    <div className={classNames(styles.grid, styles[activeGapSize])}>
      {children}
    </div>
  );
}

export default Grid;
