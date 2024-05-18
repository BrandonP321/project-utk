import classNames from "classnames";
import { SpaceBetween } from "../SpaceBetween/SpaceBetween";
import Spinner from "../Spinner/Spinner";
import styles from "./LoadingContainer.module.scss";
import LoadingContainerProvider from "./LoadingContainerProvider";
import { useLoading } from "./useLoading";
import { ClassesProp } from "../../utils/UtilityTypes";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

namespace LoadingContainer {
  export type Props = React.PropsWithChildren<{
    loading?: boolean;
    showOnLocationChange?: boolean;
    classes?: ClassesProp<"root">;
  }>;
}

function LoadingContainerContent({
  classes,
  showOnLocationChange,
}: LoadingContainer.Props) {
  const { loading, startLoading } = useLoading();
  const location = useLocation();

  useEffect(() => {
    if (showOnLocationChange) {
      startLoading();
    }
  }, [location]);

  return (
    <SpaceBetween
      classes={{
        root: classNames(styles.overlay, loading && styles.show, classes?.root),
      }}
      justify="center"
      align="center"
    >
      <Spinner />
    </SpaceBetween>
  );
}

function LoadingContainer(props: LoadingContainer.Props) {
  const { loading, children } = props;

  return (
    <LoadingContainerProvider loading={loading}>
      <LoadingContainerContent {...props} />
      {children}
    </LoadingContainerProvider>
  );
}

export default LoadingContainer;
