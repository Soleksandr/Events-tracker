import users from "./Users";
import Router from "koa-router";;

const router = new Router();

router.use("/api", users);

export default router.routes();
