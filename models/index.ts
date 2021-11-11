// @ts-nocheck
import { Sequelize } from "sequelize";
import configJSON from "../config/config.json";
import user from "../models/User";
import type { Options } from "sequelize";
type envType = "production" | "development" | "test";
export interface IConfig {
  options: Options;
  database: string;
  username: string;
  password: string;
}
export interface IBDConfig {
  [key: string]: any;
  Sequelize: typeof Sequelize;
  sequelize: Sequelize;
}
const env: envType = process.env.NODE_ENV || ("development" as const);
const config = configJSON[env] as IConfig;
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db: IBDConfig = {
  sequelize: sequelize,
  Sequelize,
};
const userModel = user(sequelize);
db[userModel.name] = userModel;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
sequelize.sync();
export default db;
