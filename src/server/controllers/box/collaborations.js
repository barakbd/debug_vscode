"use strict";
exports.__esModule = true;
var express_1 = require("express");
// import * as defaultExport from "../route-controller-module"
var createRoutes = function (boxClient) {
    var router = express_1.Router();
    var collaborationMethods = new CollaborationMethods(boxClient);
    router.get("/:id", collaborationMethods.get);
    router.post("/", collaborationMethods.create);
    router.get("/:id/items", collaborationMethods.getItems);
    router.put("/", collaborationMethods.update);
    return router;
};
var CollaborationMethods = /** @class */ (function () {
    function CollaborationMethods(boxClient) {
        var _this = this;
        this.get = function (req, res) {
            _this._boxClientLocal.collaborations
                .get(/* "45416054928" */ req.params.id)
                .then(function (collaborationInfo) {
                console.log("sdsdsdsdsd");
                return res.json({
                    status: 200,
                    data: collaborationInfo
                });
            })["catch"](function (err) {
                return res.json(err);
            });
        }; //end get
        this.create = function (req, res) {
            if (!req.body || !req.body.folder_id || !req.body.user_id) {
                return res.json({
                    status: 400,
                    message: "can't add empty folder_id or user_id"
                });
            }
            else if (typeof req.body.folder_id !== "string" || typeof req.body.user_id !== "string") {
                return res.json({
                    status: 400,
                    message: "folder_id or user_id must be a string"
                });
            }
            return _this._boxClientLocal.collaborations.createWithUserEmail(req.body.user_id, req.body.folder_id, _this._boxClientLocal.collaborationRoles.VIEWER, { notify: false })
                .then(function (collaborationInfo) {
                return res.json({
                    status: 400,
                    data: collaborationInfo
                });
            })["catch"](function (err) {
                return res.json(err);
            });
        }; //end create
        this.update = function (req, res) {
            if (!req.body || !req.body.collaboration_id) {
                return res.json({
                    status: 400,
                    message: "can't add empty collaboration_id"
                });
            }
            else if (typeof req.body.collaboration_id !== "string") {
                return res.json({
                    status: 400,
                    message: "collaboration_id must be a string"
                });
            }
            return _this._boxClientLocal.collaborations.update(req.body.collaboration_id, { role: _this._boxClientLocal.collaborationRoles.EDITOR })
                .then(function (collaborationInfo) {
                return res.json({
                    status: 400,
                    data: collaborationInfo
                });
            })["catch"](function (err) {
                return res.json(err);
            });
        }; //end update
        this.getItems = function (req, res) {
            return _this._boxClientLocal.collaborations
                .getItems(/* "45416054928" */ req.params.id, {
                fields: "name,shared_link,permissions,collections,sync_state"
            })
                .then(function (collaborationInfo) {
                return res.json({
                    status: 200,
                    data: collaborationInfo
                });
            })["catch"](function (err) {
                return res.json(err);
            });
        }; //end getItems
        this._boxClientLocal = boxClient;
    } //end constructor
    return CollaborationMethods;
}()); //end class  CollaborationMethods
exports["default"] = createRoutes;
