import app from "./app";
import { db } from "./db";

db.connect()
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch(console.error);