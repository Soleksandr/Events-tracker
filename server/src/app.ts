import path from "path";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import serveStatic from "koa-static";
import routes from "./router";

const app = new Koa();

app.use(bodyParser());
app.use(routes);

if (app.env === "production") {
  app.use(serveStatic(path.resolve(__dirname, "..", "..", "client", "build")));
}

export default app;
