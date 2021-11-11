"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const sequelize_1 = require("sequelize");
const config_json_1 = __importDefault(require("../config/config.json"));
const User_1 = __importDefault(require("../models/User"));
const env = process.env.NODE_ENV || "development";
const config = config_json_1.default[env];
const sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
const db = {
    sequelize: sequelize,
    Sequelize: sequelize_1.Sequelize,
};
const userModel = (0, User_1.default)(sequelize);
db[userModel.name] = userModel;
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
sequelize.sync();
exports.default = db;
