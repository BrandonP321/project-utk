import { GetAuthedVendorListings } from "@project-utk/shared/src/api/routes/vendorListing";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useActions } from "../../hooks/useActions";

type AuthVendorListings = GetAuthedVendorListings.ResBody["listings"];

type AuthVendorListingsState = {
  listings: AuthVendorListings | null;
};

const initialState: AuthVendorListingsState = {
  listings: null,
};

const authVendorListingsSlice = createSlice({
  name: "authVendorListings",
  initialState,
  reducers: {
    setListings: (
      state,
      action: PayloadAction<{ listings: AuthVendorListings }>,
    ) => {
      state.listings = action.payload.listings;
    },
    clearListings: (state) => {
      state.listings = null;
    },
  },
});

export const authVendorListingsActions = authVendorListingsSlice.actions;
export const useAuthVendorListingsActions = () =>
  useActions(authVendorListingsActions);

export default authVendorListingsSlice;
