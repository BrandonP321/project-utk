import { Express } from "express";
import { vendorRouter } from "./vendor.routes";
import { vendorListingRouter } from "./vendorListing.routes";

export const setupRoutes = (app: Express) => {
  app.use(vendorRouter);
  app.use(vendorListingRouter);
};
