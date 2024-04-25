import { GetAuthedVendorListings } from "@project-utk/shared/src/api/routes/vendorListing/GetAuthedVendorListings";
import { Controller } from "../../utils";
import { AuthVendorLocals, VendorJWTLocals } from "../../middleware";
import VendorListing from "../../models/vendorListing/VendorListing";
import { VendorListingPublicProps } from "@project-utk/shared/src/api/models/vendorListing/IVendorListing";

const controller = new Controller<
  GetAuthedVendorListings.ReqBody,
  GetAuthedVendorListings.ResBody,
  VendorJWTLocals & AuthVendorLocals,
  {},
  typeof GetAuthedVendorListings.Errors
>(GetAuthedVendorListings.Errors);

export const GetAuthedVendorListingsController = controller.handler(
  async (req, res, errors) => {
    const { vendorId } = res.locals;

    const listings = await VendorListing.findAll({
      where: { vendorId },
      attributes: VendorListingPublicProps,
    });

    return res.json({ listings });
  }
);
