import Vendor from "./Vendor";
import bcrypt from "bcrypt";

export function assignVendorHooks(vendor: typeof Vendor) {
  vendor.beforeCreate(async (vendor) => {
    vendor.password = await getHashedPassword(vendor.password);
  });

  vendor.beforeUpdate(async (vendor) => {
    if (vendor.changed("password")) {
      vendor.password = await getHashedPassword(vendor.password);
    }
  });
}

async function getHashedPassword(password: string) {
  return await bcrypt.hash(password, 10);
}
