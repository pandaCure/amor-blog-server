"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user = (sequelize) => {
    class User extends sequelize_1.Model {
        id;
        password;
        username;
    }
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        password: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false,
        },
        username: {
            type: new sequelize_1.DataTypes.STRING(128),
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "User",
        tableName: "users",
    });
    return User;
};
exports.default = user;
