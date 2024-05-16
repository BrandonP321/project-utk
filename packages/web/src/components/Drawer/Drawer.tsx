import classNames from "classnames";
import styles from "./Drawer.module.scss";
import { useDrawer } from "./useDrawer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/pro-solid-svg-icons";

namespace Drawer {
  export type Props = React.PropsWithChildren<{}>;
}

function Drawer({ children }: Drawer.Props) {
  const { open, closeDrawer } = useDrawer();

  return (
    <>
      <div
        className={classNames(styles.overlay, open && styles.show)}
        onClick={closeDrawer}
      />
      <div className={classNames(styles.drawer, open && styles.show)}>
        <button onClick={closeDrawer} className={styles.closeButton}>
          <FontAwesomeIcon icon={faX} />
        </button>
        {children}
      </div>
    </>
  );
}

export default Drawer;
