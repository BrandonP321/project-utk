import dotenv from "dotenv";
import { addYupExtensions } from "@project-utk/shared/src/schemas/yupExtensions";

// Load environment variables and add custom yup extensions before anything else
dotenv.config();
addYupExtensions();

import express from "express";
import { configureDefaultMiddleware } from "./middleware/default.middleware";
import { setupRoutes } from "./routes";

export const app = express();

console.log("hiw");

// Middleware
configureDefaultMiddleware(app);

// Routes
setupRoutes(app);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ msg: "HI" }).end();
});
