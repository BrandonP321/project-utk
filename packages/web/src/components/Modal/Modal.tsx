import React, { useEffect } from "react";
import styles from "./Modal.module.scss";
import classNames from "classnames";
import { WindowUtils } from "../../utils/WindowUtils";

namespace Modal {
  export type ControlProps = {
    show: boolean;
    onClose: () => void;
  };

  export type Props = ControlProps & React.PropsWithChildren<{}>;
}

function Modal(props: Modal.Props) {
  const { onClose, show, children } = props;

  useEffect(() => {
    if (show) {
      WindowUtils.lockScroll();
    } else {
      WindowUtils.unlockScroll();
    }

    return () => {
      WindowUtils.unlockScroll();
    };
  }, [show]);

  return (
    <div className={classNames(styles.outerWrapper, !show && styles.hide)}>
      <div className={classNames(styles.overlay)} onClick={onClose} />

      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <button className={styles.close} onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
