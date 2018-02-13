import * as express from "express";
import * as bodyParser  from "body-parser";
import {appRouter} from "./server/config/routes"
const expressRouter = express.Router();

// import routes from
class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.configureBodyParser();
    this.mountRoutes();
  } //end constructor

  private configureBodyParser() {
    this.express.use(bodyParser.json());
    this.express.use(
      bodyParser.urlencoded({
        extended: false
      })
    );
  } //end configureBodyParser

  private mountRoutes(): void {
    this.express.get("/test", (req, res) => {
      res.json({
        message: "Hello sdsdsdsd!"
      });
    });
    this.express.use(appRouter);
  } //end mountRoutes
} //end Class App

export default new App().express;
