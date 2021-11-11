"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const User_contor_1 = __importDefault(require("../controller/User.contor"));
const router = new koa_router_1.default({ prefix: "/users" });
router.post("/", async (ctx, next) => {
    const res = await User_contor_1.default.createUser(ctx.request.body);
    ctx.body = res;
});
exports.default = router;
