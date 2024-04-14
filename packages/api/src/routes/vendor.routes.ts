import { RegisterVendor } from "@project-utk/shared/src/api/routes/vendor/RegisterVendor";
import express from "express";
import { RegisterVendorController } from "../controllers/vendor/RegisterVendorController";
import { LoginVendor } from "@project-utk/shared/src/api/routes/vendor/LoginVendor";
import { LoginVendorController } from "../controllers/vendor/LoginVendorController";
import { VerifyVendorEmail } from "@project-utk/shared/src/api/routes/vendor/VerifyVendorEmail";
import { VerifyVendorEmailController } from "../controllers/vendor/VerifyVendorEmailController";
import { SendVendorVerificationEmail } from "@project-utk/shared/src/api/routes/vendor/SendVendorVerificationEmail";
import { sendVendorVerificationEmailController } from "../controllers/vendor/SendVendorVerificationEmailController";
import { getAuthVendor } from "../middleware/getAuthVendor.middleware";
import { authenticateJWT } from "../middleware/authenticateJWT.middleware";
import { RequestVendorPasswordReset } from "@project-utk/shared/src/api/routes/vendor/RequestVendorPasswordReset";
import { RequestVendorPasswordResetController } from "../controllers/vendor/RequestVendorPasswordResetController";
import { ResetVendorPasswordController } from "../controllers/vendor/ResetVendorPasswordController";
import { ResetVendorPassword } from "@project-utk/shared/src/api/routes/vendor/ResetVendorPassword";
import { ResetVendorPasswordLimiter } from "../middleware/rateLimiters/ResetVendorPasswordLimiter";
import { RequestVendorPasswordResetLimiter } from "../middleware/rateLimiters/RequestVendorPasswordResetLimiter";
import { VerifyVendorEmailLimiter } from "../middleware/rateLimiters/VerifyVendorEmailLimiter";

const router = express.Router();

router.post(RegisterVendor.Path, RegisterVendorController);
router.post(LoginVendor.Path, LoginVendorController);
router.post(
  VerifyVendorEmail.Path,
  VerifyVendorEmailLimiter,
  VerifyVendorEmailController
);
router.post(
  SendVendorVerificationEmail.Path,
  authenticateJWT,
  getAuthVendor,
  sendVendorVerificationEmailController
);
router.post(
  RequestVendorPasswordReset.Path,
  RequestVendorPasswordResetLimiter,
  RequestVendorPasswordResetController
);
router.post(
  ResetVendorPassword.Path,
  ResetVendorPasswordLimiter,
  ResetVendorPasswordController
);

export const vendorRouter = router;
