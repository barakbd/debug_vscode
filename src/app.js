"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var routes_1 = require("./server/config/routes");
var expressRouter = express.Router();
// import routes from
var App = /** @class */ (function () {
    function App() {
        this.express = express();
        this.configureBodyParser();
        this.mountRoutes();
    } //end constructor
    App.prototype.configureBodyParser = function () {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({
            extended: false
        }));
    }; //end configureBodyParser
    App.prototype.mountRoutes = function () {
        this.express.get("/test", function (req, res) {
            res.json({
                message: "Hello kkkk!"
            });
        });
        this.express.use(routes_1.appRouter);
    }; //end mountRoutes
    return App;
}()); //end Class App
exports["default"] = new App().express;
