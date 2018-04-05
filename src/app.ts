import * as express from "express";
import * as bodyParser from "body-parser";
import {appRouter} from "./config/routes";

const app: express.Application = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.get("/test", (req, res) => {
  res.json({
    message: "Hello yuiohkh!"
  });
});
app.use(appRouter);
export {app}