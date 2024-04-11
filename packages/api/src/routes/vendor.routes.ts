import { RegisterVendor } from "@project-utk/shared/src/api/routes/vendor/RegisterVendor";
import express from "express";
import { RegisterVendorController } from "../controllers/vendor/RegisterVendor.controller";

const router = express.Router();

router.post(RegisterVendor.Path, RegisterVendorController);

export const vendorRouter = router;
