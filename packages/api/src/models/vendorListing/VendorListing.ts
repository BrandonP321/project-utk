import {
  IVendorListing,
  VendorListingCreationAttributes,
} from "@project-utk/shared/src/api/models/vendorListing/IVendorListing";
import { DataTypes, IncludeOptions, Model } from "sequelize";
import { sequelize } from "../../config/database/sequelize.config";
import { assignVendorListingHooks } from "./vendorListingHooks";
import { VendorIdForeignKey } from "@project-utk/shared/src/api/models/vendor/IVendor";

class VendorListing
  extends Model<IVendorListing, VendorListingCreationAttributes>
  implements IVendorListing
{
  public id!: string;
  public [VendorIdForeignKey]!: string;
  public name!: string;

  public static include: IncludeOptions = {};
}

VendorListing.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    vendorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "VendorListing",
    tableName: "vendor_listings",
    indexes: [{ fields: [VendorIdForeignKey] }],
  }
);

assignVendorListingHooks(VendorListing);

export default VendorListing;
