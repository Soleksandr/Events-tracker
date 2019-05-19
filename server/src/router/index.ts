import Router from "koa-router";

import test from "./Test";

const router = new Router();

router.use("/api", test);

export default router.routes();
