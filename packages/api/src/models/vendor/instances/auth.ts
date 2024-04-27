import { PublicVendorProperties } from "@project-utk/shared/src/api/models/vendor/IVendor";
import { apiConfig } from "../../../config";
import Vendor from "../Vendor";

function isAccountLocked(this: Vendor) {
  const now = Date.now();
  return this.lockUntil && this.lockUntil > now;
}

function isAccountReadyForUnlock(this: Vendor) {
  return this.lockUntil && this.lockUntil <= Date.now();
}

function incrementFailedLoginAttempts(this: Vendor) {
  this.failedLoginAttempts += 1;
}

async function resetFailedLoginAttempts(this: Vendor) {
  this.failedLoginAttempts = 0;
  this.lockUntil = null;
  await this.save();
}

async function lockAccount(this: Vendor) {
  this.lockUntil = Date.now() + apiConfig.vendor.auth.accountLockoutDurationMs;
  await this.save();
}

function hasReachedLoginAttemptLimit(this: Vendor) {
  return this.failedLoginAttempts >= apiConfig.vendor.auth.loginAttemptLimit;
}

function toPublicJSON(this: Vendor): PublicVendorProperties {
  return {
    id: this.id,
    name: this.name,
    email: this.email,
  };
}

export const authInstanceMethods = {
  isAccountLocked,
  incrementFailedLoginAttempts,
  resetFailedLoginAttempts,
  lockAccount,
  hasReachedLoginAttemptLimit,
  isAccountReadyForUnlock,
  toPublicJSON,
};
