import express from "express";
import { authenticateJWT, getAuthVendor } from "../middleware";
import { CreateVendorListingController } from "../controllers/vendorListing/CreateVendorListingController";
import { CreateVendorListing } from "@project-utk/shared/src/api/routes/vendorListing/CreateVendorListing";
import { GetAuthedVendorListings } from "@project-utk/shared/src/api/routes/vendorListing/GetAuthedVendorListings";
import { GetAuthedVendorListingsController } from "../controllers/vendorListing/GetAuthedVendorListingsController";
import { GetListingPricingInfo } from "@project-utk/shared/src/api/routes/vendorListing";
import { GetListingPricingInfoController } from "../controllers/vendorListing/GetListingPricingInfoController";
import { GetVendorListing } from "@project-utk/shared/src/api/routes/vendorListing/GetVendorListing";
import { GetVendorListingController } from "../controllers/vendorListing/GetVendorListingController";
import { getVendorListingMiddleware } from "../middleware/getVendorListing.middleware";

const router = express.Router();

// Create listing
router.post(
  CreateVendorListing.Path,
  authenticateJWT,
  getAuthVendor,
  CreateVendorListingController
);

// Get authed vendor listings
router.post(
  GetAuthedVendorListings.Path,
  authenticateJWT,
  getAuthVendor,
  GetAuthedVendorListingsController
);

// Get listing
router.post(
  GetVendorListing.Path,
  getVendorListingMiddleware(),
  GetVendorListingController
);

// Get listing Pricing Info
router.post(GetListingPricingInfo.Path, GetListingPricingInfoController);

export const vendorListingRouter = router;
