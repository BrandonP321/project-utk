import express from "express";
import {
  LoginVendorController,
  LogoutVendorController,
  RegisterVendorController,
  RequestVendorPasswordResetController,
  ResetVendorPasswordController,
  VerifyVendorEmailController,
  sendVendorVerificationEmailController,
} from "../controllers";
import {
  RequestVendorPasswordResetLimiter,
  ResetVendorPasswordLimiter,
  VerifyVendorEmailLimiter,
  authenticateJWT,
  getAuthVendor,
} from "../middleware";
import {
  LoginVendor,
  LogoutVendor,
  RegisterVendor,
  RequestVendorPasswordReset,
  ResetVendorPassword,
  SendVendorVerificationEmail,
  VerifyVendorEmail,
} from "@project-utk/shared/src/api/routes/vendor";

const router = express.Router();

// Register
router.post(RegisterVendor.Path, RegisterVendorController);
// Login
router.post(LoginVendor.Path, LoginVendorController);
// Logout
router.post(
  LogoutVendor.Path,
  authenticateJWT,
  getAuthVendor,
  LogoutVendorController
);
// Verify Email
router.post(
  VerifyVendorEmail.Path,
  VerifyVendorEmailLimiter,
  VerifyVendorEmailController
);
// Send Verification Email
router.post(
  SendVendorVerificationEmail.Path,
  authenticateJWT,
  getAuthVendor,
  sendVendorVerificationEmailController
);
// Request Password Reset
router.post(
  RequestVendorPasswordReset.Path,
  RequestVendorPasswordResetLimiter,
  RequestVendorPasswordResetController
);
// Reset Password
router.post(
  ResetVendorPassword.Path,
  ResetVendorPasswordLimiter,
  ResetVendorPasswordController
);

export const vendorRouter = router;
