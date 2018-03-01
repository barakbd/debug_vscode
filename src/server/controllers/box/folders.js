"use strict";
exports.__esModule = true;
var express_1 = require("express");
// import * as defaultExport from "../route-controller-module"
var createRoutes = function (boxClient) {
    var router = express_1.Router();
    var folderMethods = new FolderMethods(boxClient);
    router.post("/", folderMethods.create);
    router.get("/:id", folderMethods.get);
    router.get("/:id/items", folderMethods.getItems);
    return router;
};
exports["default"] = createRoutes;
var FolderMethods = /** @class */ (function () {
    function FolderMethods(boxClient) {
        var _this = this;
        this.create = function (req, res) {
            return _this._boxClientLocal.folders
                .create(req.body.ancestor_folder_id, req.body.folder_to_create)
                .then(function (folderInfo) {
                return res.status(200).json(folderInfo);
            })["catch"](function (err) {
                return res.status(400).json(err);
            });
        }; //end create
        this.get = function (req, res) {
            _this._boxClientLocal.folders
                .get(/* "45416054928" */ req.params.id, {
                fields: "name,shared_link,permissions,collections,sync_state"
            })
                .then(function (folderInfo) {
                return res.status(200).json(folderInfo);
            })["catch"](function (err) {
                return res.status(400).json(err);
            });
        }; //end get
        this.getItems = function (req, res) {
            return _this._boxClientLocal.folders
                .getItems(/* "45416054928" */ req.params.id, {
                fields: "name,shared_link,permissions,collections,sync_state"
            })
                .then(function (folderInfo) {
                return res.status(200).json(folderInfo);
            })["catch"](function (err) {
                return res.status(400).json(err);
            });
        }; //end getItems
        this._boxClientLocal = boxClient;
    } //end constructor
    return FolderMethods;
}()); //end class FolderMethods
