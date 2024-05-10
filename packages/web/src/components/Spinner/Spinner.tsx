import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClassesProp } from "../../utils/UtilityTypes";
import styles from "./Spinner.module.scss";
import { faSpinnerThird } from "@fortawesome/pro-solid-svg-icons";
import classNames from "classnames";

namespace Spinner {
  export type Props = {
    classes?: ClassesProp<"root">;
  };
}

function Spinner({ classes }: Spinner.Props) {
  return (
    <FontAwesomeIcon
      icon={faSpinnerThird}
      className={classNames(styles.spinner, classes?.root)}
    />
  );
}

export default Spinner;
