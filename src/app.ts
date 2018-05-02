import * as express from "express";
import * as bodyParser from "body-parser";
import { appRouter } from "./config/routes";
import { errorRequestHandler } from "./config/error_request_handlers";

const app: express.Application = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.get("/test/:string", (req, res) => {
  console.log("test route is working");
  res.json({
    message: `Hello from ${req.params.string}!`
  });
});
app.use(appRouter);
app.use(errorRequestHandler);
export { app };
