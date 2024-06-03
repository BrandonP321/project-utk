import { Sequelize, Options, Config } from "sequelize";
import { SecretsManagerUtils } from "../../clients/aws/secretsManager";
import { DeepWriteable } from "sequelize/types/utils";
import { EnvVars } from "../../utils/EnvVars";
import { apiConfig } from "..";

const config: Options = {
  dialect: "postgres",
  // logging: console.log,
  logging: false,
  database: apiConfig.db.name,
  host: apiConfig.db.host,
};

export const sequelize = new Sequelize(config);

async function updateDBCredentials(config: DeepWriteable<Config>) {
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

const syncDB = async () => {
  const force = true;
  return await sequelize.sync({ force }).then(() => {
    console.log("Database synced");
  });
};

export const connectToDB = async () => {
  await import("../../models/modelAssociations").then(
    ({ default: createAssociations }) => {
      createAssociations();
    },
  );
  await syncDB();

  // Can run asynchronously so server can start up
  if (EnvVars.STAGE === "local") {
    useSeeders();
  }
};

function useSeeders() {
  useVendorSeeder();
  // useVendorListingSeeder();
  // useVendorListingWithPricingInfoSeeder();
}

function useVendorSeeder() {
  import("../../seeders/vendorSeeder").then(({ default: VendorSeeder }) => {
    VendorSeeder.createVendorSeeder();
  });
}

function useVendorListingSeeder() {
  import("../../seeders/vendorListingSeeder").then(
    ({ default: VendorListingSeeder }) => {
      VendorListingSeeder.createVendorWithListingSeeder();
    },
  );
}

function useVendorListingWithPricingInfoSeeder() {
  import("../../seeders/vendorListingSeeder").then(
    ({ default: VendorListingSeeder }) => {
      VendorListingSeeder.createVendorListingWithPricingInfoSeeder();
    },
  );
}
