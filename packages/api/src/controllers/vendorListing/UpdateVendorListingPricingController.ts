import { UpdateVendorListingPricing } from "@project-utk/shared/src/api/routes/vendorListing/UpdateVendorListingPricing";
import { Controller } from "../../utils";
import { AuthVendorLocals, VendorJWTLocals } from "../../middleware";
import { VendorListingLocals } from "../../middleware/getVendorListing.middleware";
import PricingOptionGroup from "../../models/PricingOptionGroup/PricingOptionGroup";
import PricingOption from "../../models/PricingOption/PricingOption";
import { PricingOptionGroupAPI } from "@project-utk/shared/src/api/models/PricingOptionGroup/IPricingOptionGroup";
import { validatePricingGroupsInput } from "@project-utk/shared/src/schemas/vendorListing/vendorListingPricingSchema";
import { sequelize } from "../../config/database/sequelize.config";
import { Transaction } from "sequelize";

const controller = new Controller<
  UpdateVendorListingPricing.ReqBody,
  UpdateVendorListingPricing.ResBody,
  VendorJWTLocals & AuthVendorLocals & VendorListingLocals,
  {},
  typeof UpdateVendorListingPricing.Errors
>(UpdateVendorListingPricing.Errors);

export const UpdateVendorListingPricingController = controller.handler(
  async (req, res, errors, next) => {
    const { pricingGroups, listingId } = req.body;

    await validatePricingGroupsInput({ pricingGroups });

    // Get existing pricing groups and options
    const { existingPricingGroups, existingPricingOptions } =
      await getExistingPricingGroupsAndOptions(listingId);

    await sequelize.transaction(async (transaction) => {
      // Create new pricing groups and options
      const newPricingGroups = await createPricingGroupsAndOptions(
        pricingGroups,
        listingId,
        transaction
      );

      // Swap live pricing groups
      await swapLivePricingGroups(
        existingPricingGroups,
        newPricingGroups,
        transaction
      );

      // Delete old pricing groups and options
      await deleteOldPricingGroupsAndOptions(
        existingPricingGroups,
        existingPricingOptions,
        transaction
      );
    });

    return res.json({ success: true });
  }
);

async function getExistingPricingGroupsAndOptions(listingId: string) {
  const existingPricingGroups = await PricingOptionGroup.findAll({
    where: { listingId },
  });
  const existingPricingOptions = (
    await Promise.all(
      existingPricingGroups.map((group) =>
        PricingOption.findAll({ where: { groupId: group.id } })
      )
    )
  ).flat();

  return { existingPricingGroups, existingPricingOptions };
}

async function createPricingGroupsAndOptions(
  pricingGroups: PricingOptionGroupAPI.CreateRequest[],
  listingId: string,
  transaction: Transaction
) {
  return await Promise.all(
    pricingGroups.map(async (g) => {
      const group = await PricingOptionGroup.create(
        {
          ...g,
          listingId,
          isLive: false,
        },
        {
          transaction,
        }
      );

      const newOptions = await Promise.all(
        g.pricingOptions.map((po) =>
          PricingOption.create(
            {
              ...po,
              groupId: group.id,
            },
            { transaction }
          )
        )
      );

      return group;
    })
  );
}

async function swapLivePricingGroups(
  existingPricingGroups: PricingOptionGroup[],
  newPricingGroups: PricingOptionGroup[],
  transaction: Transaction
) {
  await Promise.all([
    PricingOptionGroup.update(
      { isLive: false },
      { where: { id: existingPricingGroups.map((g) => g.id) }, transaction }
    ),
    PricingOptionGroup.update(
      { isLive: true },
      { where: { id: newPricingGroups.map((g) => g.id) }, transaction }
    ),
  ]);
}

async function deleteOldPricingGroupsAndOptions(
  existingPricingGroups: PricingOptionGroup[],
  existingPricingOptions: PricingOption[],
  transaction: Transaction
) {
  await Promise.all([
    PricingOptionGroup.destroy({
      where: { id: existingPricingGroups.map((g) => g.id) },
      transaction,
    }),
    PricingOption.destroy({
      where: { id: existingPricingOptions.map((po) => po.id) },
      transaction,
    }),
  ]);
}
