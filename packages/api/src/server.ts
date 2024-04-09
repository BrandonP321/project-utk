import dotenv from "dotenv";
import express from "express";

dotenv.config();

import { createServer } from "http";

const PORT = process.env.PORT ?? 8000;

const app = express();
const httpServer = createServer(app);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ msg: "HI" }).end();
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
