import { DefaultAPIErrors } from "@project-utk/shared/src/api/routes";
import VendorListing from "../models/vendorListing/VendorListing";
import { Controller } from "../utils";
import { VendorJWTLocals } from "./authenticateJWT.middleware";

export type VendorListingLocals = {
  listing: VendorListing;
};

const controller = new Controller<
  Record<string, any>,
  {},
  Partial<VendorJWTLocals>,
  VendorListingLocals,
  typeof DefaultAPIErrors
>(DefaultAPIErrors);

export const getVendorListingMiddleware = (
  listingIdKey = "listingId",
  requireOwnership = false
) =>
  controller.handler(async (req, res, errors, next) => {
    const listingId = req.body[listingIdKey];

    if (!listingId) {
      throw errors.INVALID_INPUT("Listing ID missing from request");
    }

    const listing = await VendorListing.findByPk(listingId);

    if (!listing) {
      throw errors.RESOURCE_NOT_FOUND("Vendor listing not found");
    } else if (requireOwnership && listing.vendorId !== res.locals.vendorId) {
      throw errors.UNAUTHORIZED("Vendor does not own this listing");
    }

    next({ listing });
  });
