import { Sequelize, Options, Config } from "sequelize";
import { SecretsManagerUtils } from "../../clients/aws/secretsManager";
import Vendor, { initializeVendorModel } from "../../models/vendor/Vendor";
import { assignVendorHooks } from "../../models/vendor/vendorHooks";
import { DeepWriteable } from "sequelize/types/utils";

const config: Options = {
  dialect: "postgres",
  database: process.env.RDS_DB_NAME,
  // logging: console.log,
  logging: false,
  host: process.env.RDS_DB_HOST,
};

export const sequelize = new Sequelize(config);

async function updateDBCredentials(config: DeepWriteable<Config>) {
  console.log("\nUpdating DB credentials\n");
  const { password, username } = await SecretsManagerUtils.getDBCredentials();

  config.username = username;
  config.password = password;
}

sequelize.addHook("beforeConnect", async (config) => {
  // TODO: Update logic so credentials are only updated when they are invalid
  // if (!config.username || !config.password) {
  await updateDBCredentials(config);
  // }
});

function initializeDBModels() {
  initializeVendorModel(sequelize);
}

function assignModelHooks() {
  assignVendorHooks(Vendor);
}

const syncDB = () => {
  const force = true;
  sequelize.sync({ force }).then(() => {
    console.log("Database synced");
  });
};

export const connectToDB = () => {
  initializeDBModels();
  assignModelHooks();
  syncDB();
};
