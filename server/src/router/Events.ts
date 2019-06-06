import Router from "koa-router";
import { events } from "../managers/Events";

const router = new Router({
  prefix: "/events"
});

router.get("/", async ctx => {
  const { user } = ctx.session;
  const userEvents = await events.getByUserId(user._id);

  ctx.body = userEvents;
});

router.post("/create", async ctx => {
  const { user } = ctx.session;
  const eventData = ctx.request.body;
  const newEvent = await events.create(eventData, user);

  ctx.body = newEvent;
});

export default router.routes();
