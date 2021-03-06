import KoaRouter from "koa-router";
import user from "../controller/User.contor";
const router = new KoaRouter({ prefix: "/users" });
router.post("/", async (ctx, next) => {
  const res = await user.createUser(ctx.request.body);
  ctx.body = res;
});
router.get("/", async (ctx, next) => {
  const userInfo = ctx.state.user.data;
  const res = await user.getUserInfo(userInfo.username);
  ctx.body = res;
});
export default router;
