import classNames from "classnames";
import { ClassesProp } from "../../utils/UtilityTypes";
import styles from "./Toast.module.scss";
import { useEffect, useState } from "react";

namespace Toast {
  export type Props = {
    type: "success" | "error" | "info";
    msg: string;
    classes?: ClassesProp<"root" | "msg">;
    autoHideDurationMs?: number;
    onHide?: () => void;
  };
}

function Toast({
  msg,
  type,
  classes,
  autoHideDurationMs,
  onHide,
}: Toast.Props) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (autoHideDurationMs) {
      setTimeout(() => {
        hideToast();
      }, autoHideDurationMs);
    }
  }, [autoHideDurationMs]);

  const hideToast = () => {
    setHide(true);
    onHide?.();
  };

  return (
    <div
      className={classNames(
        styles.toast,
        classes?.root,
        styles[type],
        hide && styles.hide
      )}
    >
      <button className={styles.exitIcon} onClick={hideToast}>
        X
      </button>
      <p className={classNames(styles.msg, classes?.msg)}>{msg}</p>
    </div>
  );
}

export default Toast;
