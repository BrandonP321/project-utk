import { GetListingPricingInfo } from "@project-utk/shared/src/api/routes/vendorListing/GetListingPricingInfo";
import { Controller } from "../../utils";
import { AuthVendorLocals, VendorJWTLocals } from "../../middleware";
import PricingOptionGroup, {
  PopulatedPricingOptionGroupQueryResponseList,
} from "../../models/PricingOptionGroup/PricingOptionGroup";
import { PricingOptionGroupPublicProps } from "@project-utk/shared/src/api/models/PricingOptionGroup/IPricingOptionGroup";
import PricingOption from "../../models/PricingOption/PricingOption";
import {
  PricingOptionAPI,
  PricingOptionPublicProps,
} from "@project-utk/shared/src/api/models/PricingOption/IPricingOption";

const controller = new Controller<
  GetListingPricingInfo.ReqBody,
  GetListingPricingInfo.ResBody,
  VendorJWTLocals & AuthVendorLocals,
  {},
  typeof GetListingPricingInfo.Errors
>(GetListingPricingInfo.Errors);

export const GetListingPricingInfoController = controller.handler(
  async (req, res, errors) => {
    const { listingId } = req.body;

    if (!listingId) {
      throw errors.RESOURCE_NOT_FOUND("Listing ID not provided");
    }

    const pricingGroups = (await PricingOptionGroup.findAll({
      where: { listingId },
      attributes: PricingOptionGroupPublicProps,
      include: [
        {
          model: PricingOption,
          as: PricingOptionAPI.PopulatedQueryResponseKey,
          required: false,
          attributes: PricingOptionPublicProps,
        },
      ],
    })) as PopulatedPricingOptionGroupQueryResponseList;

    return res.json({
      pricingGroups: pricingGroups.map((g) => g.convertPopulatedToJSON()),
    });
  }
);
