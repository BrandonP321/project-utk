import { UpdateVendorListing } from "@project-utk/shared/src/api/routes/vendorListing/UpdateVendorListing";
import { Controller } from "../../utils";
import { AuthVendorLocals, VendorJWTLocals } from "../../middleware";
import { VendorListingLocals } from "../../middleware/getVendorListing.middleware";
import { validateUpdateVendorListingInput } from "@project-utk/shared/src/schemas/vendorListing/vendorListingSchema";

const controller = new Controller<
  UpdateVendorListing.ReqBody,
  UpdateVendorListing.ResBody,
  VendorJWTLocals & AuthVendorLocals & VendorListingLocals,
  {},
  typeof UpdateVendorListing.Errors
>(UpdateVendorListing.Errors);

export const UpdateVendorListingController = controller.handler(
  async (req, res, errors) => {
    const { listing } = res.locals;

    req.body.listing = await validateUpdateVendorListingInput(req.body.listing);

    await listing.update(req.body.listing);

    return res.json({});
  }
);
