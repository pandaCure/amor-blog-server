"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
class UserService {
    createUser = async (options) => {
        return await models_1.default.User.create(options);
    };
    getUserInfo = async (username) => {
        const res = await models_1.default.User.findOne({
            where: { username: username },
            raw: true,
        });
        return res;
    };
    userLogin = async (options) => {
        const res = await this.getUserInfo(options.username);
    };
}
exports.default = new UserService();
