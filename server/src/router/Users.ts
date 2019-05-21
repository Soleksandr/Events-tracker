import Router from "koa-router";
import { users } from "../managers/Users";

const router = new Router({
  prefix: "/users"
});

router.post("/create", async ctx => {
  const newUser = await users.create(ctx.request.body);

  ctx.session.user = newUser;
  ctx.body = newUser;
});

router.post("/login", async ctx => {
  const user = await users.login(ctx.request.body);

  ctx.session.user = user;
  ctx.body = user;
});

export default router.routes();
