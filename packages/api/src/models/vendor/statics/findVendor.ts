import Vendor from "../Vendor";

function findByEmail(email: string) {
  return Vendor.findOne({ where: { email } });
}

export const findVendorStatics = {
  findByEmail,
};
