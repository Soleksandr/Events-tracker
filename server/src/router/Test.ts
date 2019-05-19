import Router from "koa-router";

const router = new Router({
  prefix: "/test"
});

router.get("/", ctx => {
  ctx.body = "<h1>Event Tracker test page</h1>";
});

export default router.routes();
