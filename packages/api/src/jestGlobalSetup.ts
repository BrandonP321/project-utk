import dotenv from "dotenv";

dotenv.config();

import { addYupExtensions } from "@project-utk/shared/src/schemas/yupExtensions";
import { connectToDB } from "./config/database/sequelize.config";
import { EnvUtils } from "./utils";

module.exports = async () => {
  const start = Date.now();
  console.log("\nRunning jestGlobalSetup.ts");

  EnvUtils.setStageToTest();

  addYupExtensions();
  await connectToDB();

  const end = Date.now();
  console.log(`jestGlobalSetup.ts took ${end - start}ms\n`);
};
