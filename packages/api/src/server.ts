import dotenv from "dotenv";
import express from "express";

dotenv.config();

import { createServer } from "http";
import { tempController } from "./temp";
import { configureDefaultMiddleware } from "./middleware/default.middleware";

const PORT = process.env.PORT ?? 8000;

const app = express();
const httpServer = createServer(app);

// Middleware
configureDefaultMiddleware(app);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ msg: "HI" }).end();
});

app.post("/temp", tempController);

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
