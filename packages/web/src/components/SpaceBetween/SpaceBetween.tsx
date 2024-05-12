import React, { RefObject } from "react";
import styles from "./SpaceBetween.module.scss";
import { ResponsiveProps, Size } from "../../utils/ResponsiveUtils";
import classnames from "classnames";
import { ClassesProp } from "../../utils/UtilityTypes";
import { useMostSpecific } from "../../hooks/useMostSpecific";

type SpaceBetweenAlign = "start" | "center" | "end" | "n";
type SpaceBetweenJustify = "start" | "center" | "end" | "space-between" | "n";

export namespace SpaceBetween {
  export type Props = React.PropsWithChildren<{
    classes?: ClassesProp<"root">;
    style?: React.CSSProperties;
    inputRef?: RefObject<HTMLDivElement>;
  }> &
    ResponsiveProps<"size", Size> &
    ResponsiveProps<
      "vertical" | "stretchChildren" | "wrap" | "stretch",
      boolean
    > &
    ResponsiveProps<"justify", SpaceBetweenJustify> &
    ResponsiveProps<"align", SpaceBetweenAlign>;
}

export function SpaceBetween({
  children,
  size = "s",
  inputRef,
  vertical,
  stretch,
  responsiveStretch,
  classes,
  align,
  responsiveAlign,
  justify,
  responsiveSize,
  responsiveVertical,
  responsiveStretchChildren,
  stretchChildren = false,
  wrap = true,
  responsiveJustify,
  responsiveWrap,
  style,
}: SpaceBetween.Props) {
  const sizeToRender = useMostSpecific(size, responsiveSize);
  const isVertical = useMostSpecific(vertical, responsiveVertical);
  const isStretchChildren = useMostSpecific(
    stretchChildren,
    responsiveStretchChildren,
  );
  const isWrap = useMostSpecific(wrap, responsiveWrap);
  const justifyToRender = useMostSpecific(justify, responsiveJustify);
  const alignToRender = useMostSpecific(align, responsiveAlign);
  const renderStretch = useMostSpecific(stretch, responsiveStretch);

  return (
    <div
      ref={inputRef}
      className={classnames(
        styles.spaceBetween,
        classes?.root,
        isVertical && styles.vertical,
        alignToRender && styles[`align-${alignToRender}`],
        justifyToRender && styles[`justify-${justifyToRender}`],
        isStretchChildren && styles.stretchChildren,
        renderStretch && styles.stretch,
        isWrap && styles.wrap,
        styles[sizeToRender],
      )}
      style={style}
    >
      {children}
    </div>
  );
}
