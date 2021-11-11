import KoaRouter from "koa-router";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import user from "../controller/User.contor";
const router = new KoaRouter({ prefix: "/public" });
const secret = process.env.JWT_SECRET || "jwt_secret";
router.post("/login", async (ctx, next) => {
  const params = ctx.request.body;
  const userinfo = await user.getUserInfo(params.username);
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
  const right = await bcrypt.compare(params.password, password);
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
    token: jsonwebtoken.sign(
      {
        data: otherInfo,
        expiresIn: "2 days",
      },
      secret
    ),
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

  const bcryptPassword = await bcrypt.hash(password, 5);
  const userInfo = await user.getUserInfo(username);
  if (!userInfo) {
    await user.createUser({ username, password: bcryptPassword });
    ctx.status = 200;
    ctx.body = {
      code: 200,
      msg: "注册成功",
      status: "success",
    };
    next();
  } else {
    ctx.status = 406;
    ctx.body = {
      code: 200,
      msg: "用户已存在",
      status: "error",
    };
    return;
  }
});
export default router;
