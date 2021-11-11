import blogRouter from "./blog";
import userRouter from "./user";
import loginRouter from "./login";
import type * as Koa from "koa";
const registerRouter = (app: Koa) => {
  [blogRouter, userRouter, loginRouter].forEach((route) => {
    app.use(route.routes()).use(route.allowedMethods());
  });
};
export default registerRouter;
