import React, { useEffect } from "react";
import styles from "./Modal.module.scss";
import classNames from "classnames";
import { WindowUtils } from "../../utils/WindowUtils";
import { ClassesProp } from "../../utils/UtilityTypes";

namespace Modal {
  export type ControlProps = {
    show: boolean;
    onClose: () => void;
    fullSize?: boolean;
  };

  export type Props = ControlProps &
    React.PropsWithChildren<{
      classes?: ClassesProp<"footer" | "mainContent">;
      footer?: React.ReactNode;
    }>;
}

function Modal(props: Modal.Props) {
  const { onClose, show, children, fullSize = false, classes, footer } = props;

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

      <div className={classNames(styles.modal, fullSize && styles.fullSize)}>
        <div className={classNames(styles.modalContent)}>
          <button className={styles.close} onClick={onClose}>
            &times;
          </button>
          <div className={classNames(styles.mainContent, classes?.mainContent)}>
            {children}
          </div>
          {footer && (
            <div className={classNames(styles.footer, classes?.footer)}>
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
