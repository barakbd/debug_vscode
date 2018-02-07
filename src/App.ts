import * as express from "express";
import * as bodyParser from "body-parser";
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
    const router = express.Router();
    router.get("/", (req, res) => {
      res.json({
        message: "Hello you!"
      });
    });
    this.express.use("/", router);
  } //end mountRoutes
} //end Class App

export default new App().express;
