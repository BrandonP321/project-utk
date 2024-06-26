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
import { UpdateVendor } from "@project-utk/shared/src/api/routes/vendor/UpdateVendor";
import { UpdateVendorController } from "../controllers/vendor/UpdateVendorController";
import { GetAuthenticatedVendor } from "@project-utk/shared/src/api/routes/vendor/GetAuthenticatedVendor";
import { GetAuthenticatedVendorController } from "../controllers/vendor/GetAuthenticatedVendorController";
import { RequestVendorEmailUpdate } from "@project-utk/shared/src/api/routes/vendor/RequestVendorEmailUpdate";
import { RequestVendorEmailUpdateController } from "../controllers/vendor/RequestVendorEmailUpdateController";
import { UpdateVendorEmail } from "@project-utk/shared/src/api/routes/vendor/UpdateVendorEmail";
import { UpdateVendorEmailController } from "../controllers/vendor/UpdateVendorEmailController";

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
  LogoutVendorController,
);
// Verify Email
router.post(
  VerifyVendorEmail.Path,
  VerifyVendorEmailLimiter,
  VerifyVendorEmailController,
);
// Send Verification Email
router.post(
  SendVendorVerificationEmail.Path,
  authenticateJWT,
  getAuthVendor,
  sendVendorVerificationEmailController,
);
// Request Password Reset
router.post(
  RequestVendorPasswordReset.Path,
  RequestVendorPasswordResetLimiter,
  RequestVendorPasswordResetController,
);
// Reset Password
router.post(
  ResetVendorPassword.Path,
  ResetVendorPasswordLimiter,
  ResetVendorPasswordController,
);
// Update vendor
router.post(
  UpdateVendor.Path,
  authenticateJWT,
  getAuthVendor,
  UpdateVendorController,
);
// Get Authenticated Vendor
router.post(
  GetAuthenticatedVendor.Path,
  authenticateJWT,
  getAuthVendor,
  GetAuthenticatedVendorController,
);
// Request email update
router.post(
  RequestVendorEmailUpdate.Path,
  authenticateJWT,
  getAuthVendor,
  RequestVendorEmailUpdateController,
);
// Update email
router.post(
  UpdateVendorEmail.Path,
  authenticateJWT,
  getAuthVendor,
  UpdateVendorEmailController,
);

export const vendorRouter = router;
