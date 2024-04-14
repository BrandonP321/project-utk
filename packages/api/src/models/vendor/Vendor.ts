import {
  IVendor,
  VendorCreationAttributes,
} from "@project-utk/shared/src/api/models/vendor/IVendor";
import { DataTypes, Model, Sequelize } from "sequelize";
import { vendorStatics } from "./statics";
import { vendorInstanceMethods } from "./instances";

class Vendor
  extends Model<IVendor, VendorCreationAttributes>
  implements IVendor
{
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public refreshToken!: string | null;
  public isEmailVerified!: boolean;
  public emailVerificationToken!: string | null;

  // Statics
  static findByEmail = vendorStatics.findByEmail;

  // Instance Methods
  validatePassword = vendorInstanceMethods.validatePassword;
}

export function initializeVendorModel(sequelize: Sequelize) {
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
      refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      emailVerificationToken: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
      },
    },
    { sequelize, modelName: "Vendor", tableName: "vendors" }
  );
}

export default Vendor;
