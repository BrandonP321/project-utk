import { createSlice } from "@reduxjs/toolkit";
import { useActions } from "../../hooks/useActions";
import { PublicVendorListingProperties } from "@project-utk/shared/src/api/models/vendorListing/IVendorListing";

type ListingState = {
  details: PublicVendorListingProperties | null;
  media: null;
  pricing: null;
};

const initialState: ListingState = {
  details: null,
  media: null,
  pricing: null,
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    setDetails: (state, action) => {
      state.details = action.payload;
    },
    setMedia: (state, action) => {
      state.media = action.payload;
    },
    setPricing: (state, action) => {
      state.pricing = action.payload;
    },
  },
});

export const listingActions = listingSlice.actions;
export const useListingActions = () => useActions(listingActions);

export default listingSlice;
