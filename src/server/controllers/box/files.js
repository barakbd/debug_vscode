"use strict";
exports.__esModule = true;
var express_1 = require("express");
// import * as defaultExport from "../route-controller-module"
var createRoutes = function (boxClient) {
    var router = express_1.Router();
    var fileMethods = new FileMethods(boxClient);
    router.post("/", fileMethods.create);
    router.get("/:id", fileMethods.get);
    return router;
};
exports["default"] = createRoutes;
var FileMethods = /** @class */ (function () {
    function FileMethods(boxClient) {
        var _this = this;
        this.create = function (req, res) {
            return _this._boxClientLocal.files
                .create(req.body.ancestor_file_id, req.body.file_to_create)
                .then(function (fileInfo) {
                return res.status(200).json(fileInfo);
            })["catch"](function (err) {
                return res.status(400).json(err);
            });
        }; //end create
        this.get = function (req, res) {
            _this._boxClientLocal.files
                .get(/* "45416054928" */ req.params.id, {
                fields: "name,shared_link,permissions,collections,sync_state"
            })
                .then(function (fileInfo) {
                return res.status(200).json(fileInfo);
            })["catch"](function (err) {
                return res.status(400).json(err);
            });
        }; //end get
        this.getItems = function (req, res) {
            return _this._boxClientLocal.files
                .getItems(/* "45416054928" */ req.params.id, {
                fields: "name,shared_link,permissions,collections,sync_state"
            })
                .then(function (fileInfo) {
                console.log("sdsdsdsd");
                return res.status(200).json(fileInfo);
            })["catch"](function (err) {
                return res.status(400).json(err);
            });
        }; //end getItems
        this._boxClientLocal = boxClient;
    } //end constructor
    return FileMethods;
}()); //end class FileMethods
