import "./init";
import { createServer } from "http";
import { app } from "./app";
import { connectToDB } from "./config/database/sequelize.config";
import { EnvVars } from "./utils/EnvVars";

const PORT = process.env.PORT ?? 8000;
const httpServer = createServer(app);

EnvVars.loadEnvVars(() => {
  connectToDB().then(() => {
    httpServer.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  });
});
