import dotenv from "dotenv";
import express from "express";

dotenv.config();

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
