import {
  IVendor,
  VendorCreationAttributes,
} from "@project-utk/shared/src/api/models/vendor/IVendor";
import { DataTypes, Model, Sequelize } from "sequelize";
import { vendorStatics } from "./statics";
import { vendorInstanceMethods } from "./instances";
import { sequelize } from "../../config/database/sequelize.config";
import { assignVendorHooks } from "./vendorHooks";

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
  public resetToken!: string | null;
  public failedLoginAttempts!: number;
  public lockUntil!: number | null;

  // Statics
  static findByEmail = vendorStatics.findByEmail;

  // Instance Methods
  validatePassword = vendorInstanceMethods.validatePassword;
  isAccountLocked = vendorInstanceMethods.isAccountLocked;
  isAccountReadyForUnlock = vendorInstanceMethods.isAccountReadyForUnlock;
  incrementFailedLoginAttempts =
    vendorInstanceMethods.incrementFailedLoginAttempts;
  resetFailedLoginAttempts = vendorInstanceMethods.resetFailedLoginAttempts;
  lockAccount = vendorInstanceMethods.lockAccount;
  hasReachedLoginAttemptLimit =
    vendorInstanceMethods.hasReachedLoginAttemptLimit;
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
    resetToken: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    failedLoginAttempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    lockUntil: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "Vendor",
    tableName: "vendors",
    indexes: [{ unique: true, fields: ["email"] }],
  }
);

assignVendorHooks(Vendor);

export default Vendor;
