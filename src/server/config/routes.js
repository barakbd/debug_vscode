"use strict";
exports.__esModule = true;
/*
https://stackoverflow.com/questions/45023624/how-to-require-multiple-controllers-with-express
https://www.terlici.com/2014/09/29/express-router.html
 */
// declare function require(moduleName: string): any;
var express_1 = require("express");
var fs_1 = require("fs");
var path_1 = require("path");
var box_service_account_1 = require("./box_service_account");
var appRouter = express_1.Router();
exports.appRouter = appRouter;
/*
import createRoutesFolder from "../controllers/box/folders";
appRouter.use("/box/folders", createRoutesFolder(boxServiceAccountClient));
 */
/* import createRoutesFolder from "../controllers/box/search";
appRouter.use("/box/search", createRoutesFolder(boxServiceAccountClient));
 */
fs_1.readdirSync(path_1.join(__dirname, "../controllers/box"))
    .filter(function (fileName) {
    return (fileName !== "**.spec.**") /*  && (fileName !== "search.js") */;
})
    .forEach(function (controllerFile) {
    var controllerBaseName = path_1.basename(controllerFile, ".js");
    // require(`../controllers/box/${controllerBaseName}`)
    Promise.resolve().then(function () { return require("../controllers/box/" + controllerBaseName); }).then(function (controller) {
        appRouter.use("/box/" + controllerBaseName, controller["default"](box_service_account_1.boxServiceAccountClient));
    })["catch"](function (error) {
        console.log(error);
    });
}); //end forEach 
