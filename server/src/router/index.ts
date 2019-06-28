import users from "./Users";
import events from "./Events";
import Router from "koa-router";;

const router = new Router();

router.use("/api", users);
router.use("/api", events);

export default router.routes();
