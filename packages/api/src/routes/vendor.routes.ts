import { RegisterVendor } from "@project-utk/shared/src/api/routes/vendor/RegisterVendor";
import express from "express";
import { RegisterVendorController } from "../controllers/vendor/RegisterVendorController";
import { LoginVendor } from "@project-utk/shared/src/api/routes/vendor/LoginVendor";
import { LoginVendorController } from "../controllers/vendor/LoginVendorController";

const router = express.Router();

router.post(RegisterVendor.Path, RegisterVendorController);
router.post(LoginVendor.Path, LoginVendorController);

export const vendorRouter = router;
