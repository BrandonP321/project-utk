import { Express } from "express";
import { vendorRouter } from "./vendor.routes";

export const setupRoutes = (app: Express) => {
  app.use(vendorRouter);
};
