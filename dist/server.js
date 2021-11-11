"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const cors_1 = __importDefault(require("@koa/cors"));
const koa_jwt_1 = __importDefault(require("koa-jwt"));
const routes_1 = __importDefault(require("./routes"));
const secret = process.env.JWT_SECRET || "jwt_secret";
const app = new koa_1.default();
app.use(async (ctx, next) => {
    return next().catch((err) => {
        console.log(err);
        if (401 == err.status) {
            ctx.status = 401;
            ctx.body = {
                msg: "token失效，请重新登录",
                status: err.status,
                code: 401,
            };
        }
        else {
            ctx.status = 400;
            ctx.body = {
                msg: err.message || "服务端异常",
                status: err.status,
                code: 400,
            };
        }
    });
});
app.use((0, koa_jwt_1.default)({
    secret: secret,
}).unless({
    path: [/^\/public/, "/"],
}));
app.use((0, cors_1.default)()).use((0, koa_bodyparser_1.default)({})).use((0, koa_logger_1.default)());
(0, routes_1.default)(app);
app.listen("8980", () => {
    console.log("server listening at: 8980");
});
