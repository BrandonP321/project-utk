import { useCallback, useMemo } from "react";
import { useResponsive } from "../features/responsive/useResponsive";
import { ResponsiveUtils } from "../utils/ResponsiveUtils";
import { ResponsiveBreakpoint } from "../features/responsive/responsiveSlice";

export function useMostSpecific<T>(
  defaultValue: T,
  map?: Partial<Record<ResponsiveBreakpoint, T>>,
) {
  const responsive = useResponsive();

  const getMostSpecific = useCallback(
    ResponsiveUtils.createMostSpecificGetter(responsive),
    [responsive],
  );

  const value = useMemo(
    () => getMostSpecific(map, defaultValue),
    [getMostSpecific, map, defaultValue],
  );

  return value;
}
