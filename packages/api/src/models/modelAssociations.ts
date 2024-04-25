import { VendorIdForeignKey } from "@project-utk/shared/src/api/models/vendor/IVendor";
import Vendor from "./vendor/Vendor";
import VendorListing from "./vendorListing/VendorListing";
import {
  VendorListingAPI,
  VendorListingIdForeignKey,
} from "@project-utk/shared/src/api/models/vendorListing/IVendorListing";
import PricingOptionGroup from "./PricingOptionGroup/PricingOptionGroup";
import {
  PricingOptionGroupAPI,
  PricingOptionGroupIdForeignKey,
} from "@project-utk/shared/src/api/models/PricingOptionGroup/IPricingOptionGroup";
import { PricingOptionAPI } from "@project-utk/shared/src/api/models/PricingOption/IPricingOption";
import PricingOption from "./PricingOption/PricingOption";

export default function createModelAssociations() {
  /**
   * Vendor has many VendorListing
   */
  Vendor.hasMany(VendorListing, {
    foreignKey: VendorIdForeignKey,
    as: VendorListingAPI.PopulatedQueryResponseKey,
  });
  VendorListing.belongsTo(Vendor, {
    foreignKey: VendorIdForeignKey,
  });

  /**
   * VendorListing has many PricingOptionGroup
   */
  VendorListing.hasMany(PricingOptionGroup, {
    foreignKey: VendorListingIdForeignKey,
    as: PricingOptionGroupAPI.PopulatedQueryResponseKey,
  });
  PricingOptionGroup.belongsTo(VendorListing, {
    foreignKey: VendorListingIdForeignKey,
  });

  /**
   * PricingOptionGroup has many PricingOption
   */
  PricingOptionGroup.hasMany(PricingOption, {
    foreignKey: PricingOptionGroupIdForeignKey,
    as: PricingOptionAPI.PopulatedQueryResponseKey,
  });
  PricingOption.belongsTo(PricingOptionGroup, {
    foreignKey: PricingOptionGroupIdForeignKey,
  });
}
