import {
  IPricingOptionGroup,
  PricingOptionGroupCreationAttributes,
} from "@project-utk/shared/src/api/models/PricingOptionGroup/IPricingOptionGroup";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/database/sequelize.config";
import { assignPricingOptionGroupHooks } from "./pricingOptionGroupHooks";
import { VendorListingIdForeignKey } from "@project-utk/shared/src/api/models/vendorListing/IVendorListing";
import { PricingOptionAPI } from "@project-utk/shared/src/api/models/PricingOption/IPricingOption";
import PricingOption from "../PricingOption/PricingOption";

class PricingOptionGroup
  extends Model<IPricingOptionGroup, PricingOptionGroupCreationAttributes>
  implements IPricingOptionGroup
{
  public id!: string;
  public [VendorListingIdForeignKey]!: string;
  public groupType!: string;
  public groupLabel!: string;

  public convertPopulatedToJSON() {
    const unknownThis = this as unknown;
    const typedPopulatedGroup =
      unknownThis as PopulatedPricingOptionGroupQueryResponse;

    return {
      ...this.toJSON(),
      [PricingOptionAPI.PopulatedQueryResponseKey]: typedPopulatedGroup[
        PricingOptionAPI.PopulatedQueryResponseKey
      ].map((pricingOption) => pricingOption.toJSON()),
    };
  }
}

export type PopulatedPricingOptionGroupQueryResponse = PricingOptionGroup & {
  [PricingOptionAPI.PopulatedQueryResponseKey]: PricingOption[];
};

export type PopulatedPricingOptionGroupQueryResponseList =
  PopulatedPricingOptionGroupQueryResponse[];

PricingOptionGroup.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    listingId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    groupType: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    groupLabel: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PricingOptionGroup",
    tableName: "pricing_option_groups",
    indexes: [{ fields: [VendorListingIdForeignKey] }],
  }
);

assignPricingOptionGroupHooks(PricingOptionGroup);

export default PricingOptionGroup;
