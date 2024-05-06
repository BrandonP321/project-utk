import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useActions } from "../../hooks/useActions";

export enum ResponsiveBreakpoint {
  Max = "max",
  Large = "large",
  Medium = "medium",
  Mobile = "mobile",
  Tiny = "tiny",
  Pico = "pico",
}

export type ResponsiveState = Record<ResponsiveBreakpoint, boolean>;

const initialState: ResponsiveState = {
  max: false,
  large: false,
  medium: false,
  mobile: false,
  tiny: false,
  pico: false,
};

/* data passed into reducers when media query event fires */
type ResponsiveBreakpointUpdate = {
  breakpoint: keyof ResponsiveState;
  matches: boolean;
};

/**
 * Returns object of key/value (breakpoint/status) for each CSS breakpoint, allowing for responsive logic within JS
 */
const responsiveSlice = createSlice({
  name: "responsive",
  initialState,
  reducers: {
    setBreakpoint: (
      state,
      action: PayloadAction<ResponsiveBreakpointUpdate>,
    ) => {
      state[action.payload.breakpoint] = action.payload.matches;
    },
  },
});

export const responsiveActions = responsiveSlice.actions;
export const useResponsiveActions = () => useActions(responsiveActions);

export default responsiveSlice;
