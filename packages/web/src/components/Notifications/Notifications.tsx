import { webConfig } from "../../config";
import { useNotificationsActions } from "../../features/notifications/notificationsSlice";
import { useNotifications } from "../../features/notifications/useNotifications";
import Toast from "../Toast/Toast";
import styles from "./Notifications.module.scss";

namespace Notifications {
  export type Props = {};
}

function Notifications(props: Notifications.Props) {
  const { removeNotification } = useNotificationsActions();
  const { notifications } = useNotifications();

  const handleHide = (id: string) => {
    // Remove notification after fade out transition
    setTimeout(() => {
      removeNotification({ id });
    }, webConfig.notifications.fadeOutTransitionDurationMs);
  };

  return (
    <div className={styles.wrapper}>
      {notifications.map((n) => (
        <Toast
          key={n.id}
          msg={n.msg}
          type={n.type}
          autoHideDurationMs={webConfig.notifications.autoHideDurationMs}
          classes={{ root: styles.toast }}
          onHide={() => handleHide(n.id)}
        />
      ))}
    </div>
  );
}

export default Notifications;
