"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./server/config/routes");
const expressRouter = express.Router();
class App {
    constructor() {
        this.express = express();
        this.configureBodyParser();
        this.mountRoutes();
    }
    configureBodyParser() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({
            extended: false
        }));
    }
    mountRoutes() {
        expressRouter.get("/hello test", (req, res) => {
            res.json({
                message: "Hello you!"
            });
        });
        this.express.use(routes_1.appRouter);
    }
}
exports.default = new App().express;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFtQztBQUNuQywwQ0FBMkM7QUFDM0MsbURBQWdEO0FBQ2hELE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUd2QztJQUdFO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVPLG1CQUFtQjtRQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDZCxVQUFVLENBQUMsVUFBVSxDQUFDO1lBQ3BCLFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVPLFdBQVc7UUFDakIsYUFBYSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDNUMsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDUCxPQUFPLEVBQUUsWUFBWTthQUN0QixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFTLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxJQUFJLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyJ9