import KoaRouter from "koa-router";
const router = new KoaRouter();
router.get("/", async (ctx, next) => {
  ctx.body = "ok";
});
export default router;
