import {
  ResponsiveBreakpoint,
  ResponsiveState,
} from "../features/responsive/responsiveSlice";

export type Size = "xxl" | "xl" | "l" | "m" | "s" | "xs" | "xxs" | "n";

export type ResponsiveProps<K extends string, T> = {
  [key in K]?: T;
} & {
  [key in `responsive${Capitalize<K>}`]?: Partial<
    Record<ResponsiveBreakpoint, T>
  >;
};

export class ResponsiveUtils {
  /** Breakpoints ordered smallest to largest */
  public static breakpointsSmallToLarge: ResponsiveBreakpoint[] = [
    ResponsiveBreakpoint.Pico,
    ResponsiveBreakpoint.Tiny,
    ResponsiveBreakpoint.Mobile,
    ResponsiveBreakpoint.Medium,
    ResponsiveBreakpoint.Large,
    ResponsiveBreakpoint.Max,
  ];

  public static breakpointsLargeToSmall: ResponsiveBreakpoint[] =
    this.breakpointsSmallToLarge.reverse();

  public static getMostSpecificFromMap<T>(
    state: ResponsiveState,
    map: Partial<Record<ResponsiveBreakpoint, T>>,
    defaultValue: T
  ): T {
    for (const breakpoint of ResponsiveUtils.breakpointsSmallToLarge) {
      const value = map[breakpoint];
      if (state[breakpoint] && value !== undefined) {
        return value;
      }
    }
    return defaultValue;
  }

  /** Creates a simpler re-usable function from `getMostSpecificFromMap` */
  public static createMostSpecificGetter(state: ResponsiveState) {
    return function <T>(
      map: Partial<Record<ResponsiveBreakpoint, T>> | undefined,
      defaultValue: T
    ) {
      return ResponsiveUtils.getMostSpecificFromMap(
        state,
        map ?? {},
        defaultValue
      );
    };
  }
}
