"use strict";
//create express app
// const express = require('express');
// const app = express();
Object.defineProperty(exports, "__esModule", { value: true });
//Server is only sending jsons so we only need body-parser json method
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
//require routes and store in variable in order to call and pass in express app
/* require('./server/config/routes.js')(app);
const routes = require('./server/config/routes.js');
routes(app);
 */
// app.use(require('./server/config/routes'))
// const port = process.env.PORT || 3000;
//Start server
// app.listen(port, function () {
//     console.log(`listening on port ${port}`);
// });
// module.exports = app
//Typescript
const express = require("express");
const bodyParser = require("body-parser");
// import routes from
class App {
    constructor() {
        this.express = express();
        this.mountRoutes();
        this.configureBodyParser();
    }
    ; //end constructor
    configureBodyParser() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({
            extended: false
        }));
    }
    ; //end configureBodyParser
    mountRoutes() {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.json({
                message: 'Hello you!'
            });
        });
        this.express.use('/', router);
    }
    ; //end mountRoutes
} //end Class App
exports.default = new App().express;
