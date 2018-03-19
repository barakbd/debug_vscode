import * as express from "express";
import * as bodyParser  from "body-parser";
import appRouter from "./server/config/routes";
//mongoose connection created on import
import mongoose from "./server/config/monggose-connect";
const expressRouter = express.Router();

// import routes from
class App {
  public express: express.Application;
  constructor() {
    this.express = express();
    this.configureBodyParser();
    this.mountRoutes();
    mongoose.connection;
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
        message: "Hello yuiohkh!"
      });
    });
    this.express.use(appRouter);
  } //end mountRoutes
} //end Class App

export default new App().express;
