declare module "@mui/system" {
  interface BreakpointOverrides {
    max: true;
    large: true;
    medium: true;
    mobile: true;
    tiny: true;
    pico: true;
    // Disable the default breakpoints
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
  }
}

export {};
