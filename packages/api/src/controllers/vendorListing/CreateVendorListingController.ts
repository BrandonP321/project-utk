import { CreateVendorListing } from "@project-utk/shared/src/api/routes/vendorListing/CreateVendorListing";
import { Controller } from "../../utils";
import { AuthVendorLocals, VendorJWTLocals } from "../../middleware";
import VendorListing from "../../models/vendorListing/VendorListing";
import { validateAndFilterCreateVendorListingInput } from "@project-utk/shared/src/schemas/vendorListing/vendorListingSchema";

const controller = new Controller<
  CreateVendorListing.ReqBody,
  CreateVendorListing.ResBody,
  VendorJWTLocals & AuthVendorLocals,
  {},
  typeof CreateVendorListing.Errors
>(CreateVendorListing.Errors);

export const CreateVendorListingController = controller.handler(
  async (req, res, errors) => {
    const { vendorId } = res.locals;

    req.body = await validateAndFilterCreateVendorListingInput(req.body);

    const listing = await VendorListing.create({
      ...req.body,
      vendorId,
    });

    return res.json({ listingId: listing.id });
  }
);
