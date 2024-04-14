import dotenv from "dotenv";
import { addYupExtensions } from "@project-utk/shared/src/schemas/yupExtensions";

// Load environment variables and add custom yup extensions before anything else
dotenv.config();
addYupExtensions();

import express from "express";
import { createServer } from "http";
import { configureDefaultMiddleware } from "./middleware/default.middleware";
import { setupRoutes } from "./routes";
import { connectToDB } from "./config/database/sequelize.config";

const PORT = process.env.PORT ?? 8000;

const app = express();
const httpServer = createServer(app);

// Middleware
configureDefaultMiddleware(app);

// Routes
setupRoutes(app);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ msg: "HI" }).end();
});

connectToDB();

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
