import dotenv from "dotenv";

dotenv.config();

import { addYupExtensions } from "@project-utk/shared/src/schemas/yupExtensions";
import { connectToDB } from "./config/database/sequelize.config";

module.exports = async () => {
  const start = Date.now();
  console.log("\nRunning jestGlobalSetup.ts");

  addYupExtensions();
  await connectToDB();

  const end = Date.now();
  console.log(`jestGlobalSetup.ts took ${end - start}ms\n`);
};
