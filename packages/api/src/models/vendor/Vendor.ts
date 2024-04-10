import { IVendor } from "@project-utk/shared/src/api/models/vendor/IVendor";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/database/sequelize.config";
import { vendorStatics } from "./statics";
import { vendorInstanceMethods } from "./instances";
import { assignVendorHooks } from "./vendorHooks";

class Vendor extends Model<IVendor> implements IVendor {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;

  // Statics
  static findVendorByEmail = vendorStatics.findVendorByEmail;

  // Instance Methods
  validatePassword = vendorInstanceMethods.validatePassword;
}

Vendor.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Vendor", tableName: "vendors" }
);

// Attach hooks
assignVendorHooks(Vendor);

export default Vendor;
