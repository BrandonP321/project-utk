import Vendor from "../models/vendor/Vendor";

const vendorEmail = "brandon.phillips976@gmail.com";
const vendorPassword = "Password@1234";
const vendorName = "Test Account";

namespace VendorSeeder {
  export async function createVendorSeeder() {
    console.log("\nCreating vendor seeder");

    const vendor = await Vendor.create({
      email: vendorEmail,
      password: vendorPassword,
      name: vendorName,
    });

    console.log("Vendor seeder created\n");

    return vendor;
  }
}

export default VendorSeeder;
