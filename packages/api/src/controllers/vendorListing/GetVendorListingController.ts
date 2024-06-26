import { GetVendorListing } from "@project-utk/shared/src/api/routes/vendorListing/GetVendorListing";
import { Controller } from "../../utils";
import { VendorListingLocals } from "../../middleware/getVendorListing.middleware";
import { VendorJWTLocals } from "../../middleware";

const controller = new Controller<
  GetVendorListing.ReqBody,
  GetVendorListing.ResBody,
  Partial<VendorJWTLocals> & VendorListingLocals,
  {},
  typeof GetVendorListing.Errors
>(GetVendorListing.Errors);

export const GetVendorListingController = controller.handler(
  async (req, res, errors) => {
    const { listing } = res.locals;

    return res.json({ listing }).end();
  }
);
