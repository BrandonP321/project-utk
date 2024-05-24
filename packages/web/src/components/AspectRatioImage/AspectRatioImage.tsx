import classNames from "classnames";
import { ClassesProp } from "../../utils/UtilityTypes";
import styles from "./AspectRatioImage.module.scss";

namespace AspectRatioImage {
  export type Props = {
    img: string;
    onClick?: () => void;
    classes?: ClassesProp<"root" | "img">;
  };
}

function AspectRatioImage({ img, classes, onClick }: AspectRatioImage.Props) {
  return (
    <div
      className={classNames(styles.wrapper, classes?.root)}
      onClick={onClick}
    >
      <div
        className={classNames(styles.img, classes?.img)}
        style={{ backgroundImage: `url(${img})` }}
      />
    </div>
  );
}

export default AspectRatioImage;
