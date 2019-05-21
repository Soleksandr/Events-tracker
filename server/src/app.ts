import Koa from "koa";
import path from "path";
import routes from "./router";
import session from "koa-session";
import serveStatic from "koa-static";
import bodyParser from "koa-bodyparser";

const app = new Koa();

app.keys=[ process.env.KEY as string ];

app.use(session(app));
app.use(bodyParser());
app.use(routes);

if (app.env === "production") {
  app.use(serveStatic(path.resolve(__dirname, "..", "..", "client", "build")));
}

export default app;
