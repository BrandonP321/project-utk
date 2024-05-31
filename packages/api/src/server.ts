import "./init";
import { createServer } from "http";
import { app } from "./app";
import { connectToDB } from "./config/database/sequelize.config";

const PORT = process.env.PORT ?? 8000;
const httpServer = createServer(app);

connectToDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
