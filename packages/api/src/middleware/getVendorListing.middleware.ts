import { DefaultAPIErrors } from "@project-utk/shared/src/api/routes";
import VendorListing from "../models/vendorListing/VendorListing";
import { Controller } from "../utils";

export type VendorListingLocals = {
  listing: VendorListing;
};

const controller = new Controller<
  Record<string, any>,
  {},
  {},
  VendorListingLocals,
  typeof DefaultAPIErrors
>(DefaultAPIErrors);

export const getVendorListingMiddleware = (listingIdKey = "listingId") =>
  controller.handler(async (req, res, errors, next) => {
    const listingId = req.body[listingIdKey];

    if (!listingId) {
      throw errors.INVALID_INPUT("Listing ID missing from request");
    }

    const listing = await VendorListing.findByPk(listingId);

    if (!listing) {
      throw errors.RESOURCE_NOT_FOUND("Vendor listing not found");
    }

    next({ listing });
  });
