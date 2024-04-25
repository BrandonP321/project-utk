import {
  IPricingOption,
  PricingOptionCreationAttributes,
} from "@project-utk/shared/src/api/models/PricingOption/IPricingOption";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/database/sequelize.config";
import { assignPricingOptionHooks } from "./pricingOptionHooks";
import { PricingOptionGroupIdForeignKey } from "@project-utk/shared/src/api/models/PricingOptionGroup/IPricingOptionGroup";

class PricingOption
  extends Model<IPricingOption, PricingOptionCreationAttributes>
  implements IPricingOption
{
  public id!: string;
  public [PricingOptionGroupIdForeignKey]!: string;
  public label!: string;
  public price!: number;
  public min!: number | null;
  public max!: number | null;
  public unit!: string | null;
}

PricingOption.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    label: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    min: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    max: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    unit: {
      type: DataTypes.TEXT,
      defaultValue: null,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "PricingOption",
    tableName: "pricing_options",
    indexes: [{ fields: [PricingOptionGroupIdForeignKey] }],
  }
);

assignPricingOptionHooks(PricingOption);

export default PricingOption;
