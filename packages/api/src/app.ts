import express from "express";
import { configureDefaultMiddleware } from "./middleware/default.middleware";
import { setupRoutes } from "./routes";

export const app = express();

// Middleware
configureDefaultMiddleware(app);

// Routes
setupRoutes(app);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ msg: "HI" }).end();
});
