import Koa from "koa";
import bodyParser from "koa-bodyparser";
import logger from "koa-logger";
import cors from "@koa/cors";
import jwt from "koa-jwt";
import dotenvExpand from "dotenv-expand";
import dotenv from "dotenv";
import registerRouter from "./routes";
const app = new Koa();
// 读取环境变量
const path =
  process.env.NODE_ENV !== "production" ? "./.env" : "../server-config/.env";
dotenvExpand(dotenv.config({ path }));
const secret = process.env.JWT_SECRET || "jwt_secret";
app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        msg: "token失效，请重新登录",
        status: err.status,
        code: 401,
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        msg: err.message || "服务端异常",
        status: err.status,
        code: 400,
      };
    }
  });
});
app.use(
  jwt({
    secret: secret,
  }).unless({
    path: [/^\/public/, "/"],
  })
);
app.use(cors()).use(bodyParser({})).use(logger());
registerRouter(app);
app.listen("8980", () => {
  console.log("server listening at: 8980");
});
