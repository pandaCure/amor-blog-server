"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_contor_1 = __importDefault(require("../controller/User.contor"));
const router = new koa_router_1.default({ prefix: "/public" });
const secret = process.env.JWT_SECRET || "jwt_secret";
router.post("/login", async (ctx, next) => {
    const params = ctx.request.body;
    const userinfo = await User_contor_1.default.getUserInfo(params.username);
    if (!userinfo) {
        ctx.status = 401;
        ctx.body = {
            code: 401,
            msg: "用户名不存在",
            status: "error",
        };
        return;
    }
    const { password, ...otherInfo } = userinfo;
    const right = await bcrypt_1.default.compare(params.password, password);
    if (!right) {
        ctx.status = 401;
        ctx.body = {
            code: 401,
            msg: "用户名密码不正确，请重试",
            status: "error",
        };
        return;
    }
    ctx.body = {
        token: jsonwebtoken_1.default.sign({
            data: otherInfo,
            expiresIn: "2 days",
        }, secret),
    };
    next();
});
router.post("/register", async (ctx, next) => {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
        ctx.status = 400;
        ctx.body = {
            msg: "用户名密码不正确，请重试",
            status: "error",
            code: 400,
        };
        return;
    }
    const bcryptPassword = await bcrypt_1.default.hash(password, 5);
    const userInfo = await User_contor_1.default.getUserInfo(username);
    if (!userInfo) {
        await User_contor_1.default.createUser({ username, password: bcryptPassword });
        ctx.status = 200;
        ctx.body = {
            code: 200,
            msg: "注册成功",
            status: "success",
        };
        next();
    }
    else {
        ctx.status = 406;
        ctx.body = {
            code: 200,
            msg: "用户已存在",
            status: "error",
        };
        return;
    }
});
exports.default = router;
