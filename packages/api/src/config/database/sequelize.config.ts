import { Sequelize } from "sequelize";

// TODO: Update
export const sequelize = new Sequelize(
  "postgres",
  process.env.DB_USERNAME ?? "",
  process.env.DB_PASSWORD ?? "",
  {
    host: process.env.DB_HOST ?? "",
    dialect: "postgres",
    // logging: console.log,
    logging: false,
  }
);
