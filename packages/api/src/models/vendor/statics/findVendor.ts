import Vendor from "../Vendor";

function findVendorByEmail(email: string) {
  return Vendor.findOne({ where: { email } });
}

export const findVendorStatics = {
  findVendorByEmail,
};
