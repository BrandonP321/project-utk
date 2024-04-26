import PricingOption from "../models/PricingOption/PricingOption";
import PricingOptionGroup from "../models/PricingOptionGroup/PricingOptionGroup";
import VendorListing from "../models/vendorListing/VendorListing";
import VendorSeeder from "./vendorSeeder";

namespace VendorListingSeeder {
  export async function createVendorWithListingSeeder() {
    const { id: vendorId } = await VendorSeeder.createVendorSeeder();

    console.log("\nCreating vendor listing seeder");

    const vendorListing = await VendorListing.create({
      vendorId,
      name: "Test Listing",
    });

    console.log("Vendor listing seeder created\n");

    return vendorListing;
  }

  export async function createVendorListingWithPricingInfoSeeder() {
    const vendorListing = await createVendorWithListingSeeder();

    console.log("\nCreating vendor listing pricing info seeder");

    const group1 = await PricingOptionGroup.create({
      listingId: vendorListing.id,
      groupLabel: "Test Pricing Option Group",
      groupType: "radio",
      isLive: true,
    });

    const group2 = await PricingOptionGroup.create({
      listingId: vendorListing.id,
      groupLabel: "Test Pricing Option Group 2",
      groupType: "checkbox",
      isLive: true,
    });

    await Promise.all([
      PricingOption.create({
        groupId: group1.id,
        label: "Test Pricing Option",
        price: 100,
      }),

      PricingOption.create({
        groupId: group1.id,
        label: "Test Pricing Option 2",
        price: 200,
      }),

      PricingOption.create({
        groupId: group2.id,
        label: "Test Pricing Option 3",
        price: 300,
      }),

      PricingOption.create({
        groupId: group2.id,
        label: "Test Pricing Option 4",
        price: 400,
      }),
    ]);

    console.log("Vendor listing pricing info seeder created\n");

    return vendorListing;
  }
}

export default VendorListingSeeder;
