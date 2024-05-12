import { useEffect } from "react";
import { ResponsiveBreakpoint, useResponsiveActions } from "./responsiveSlice";
import { ResponsiveUtils } from "../../utils/ResponsiveUtils";

export const breakpointWidths: Record<ResponsiveBreakpoint, number> = {
  max: 1664,
  large: 1200,
  medium: 992,
  mobile: 768,
  tiny: 480,
  pico: 350,
};

export const useResponsiveSetup = () => {
  const { setBreakpoint } = useResponsiveActions();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      ResponsiveUtils.breakpointsLargeToSmall.forEach((breakpoint) => {
        const matches = width <= breakpointWidths[breakpoint];
        setBreakpoint({ breakpoint, matches });
      });
    };

    // Initial and only setup
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setBreakpoint]);
};
