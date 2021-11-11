"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blog_1 = __importDefault(require("./blog"));
const user_1 = __importDefault(require("./user"));
const login_1 = __importDefault(require("./login"));
const registerRouter = (app) => {
    [blog_1.default, user_1.default, login_1.default].forEach((route) => {
        app.use(route.routes()).use(route.allowedMethods());
    });
};
exports.default = registerRouter;
