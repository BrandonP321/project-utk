import { GetAuthenticatedVendor } from "@project-utk/shared/src/api/routes/vendor/GetAuthenticatedVendor";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthVendor = GetAuthenticatedVendor.ResBody;

type AuthVendorState = {
  vendor: AuthVendor | null;
};

const initialState: AuthVendorState = {
  vendor: null,
};

const authVendorSlice = createSlice({
  name: "authVendor",
  initialState,
  reducers: {
    setVendor: (state, action: PayloadAction<{ vendor: AuthVendor }>) => {
      state.vendor = action.payload.vendor;
    },
    clearVendor: (state) => {
      state.vendor = null;
    },
  },
});

export const authVendorActions = authVendorSlice.actions;
export default authVendorSlice;
