"use strict";
exports.__esModule = true;
var express_1 = require("express");
// import * as defaultExport from "../route-controller-module"
var createRoutes = function (boxClient) {
    var router = express_1.Router();
    var searchMethods = new SearchMethods(boxClient);
    router.get("/", searchMethods.get);
    return router;
};
exports["default"] = createRoutes;
var SearchMethods = /** @class */ (function () {
    function SearchMethods(boxClient) {
        var _this = this;
        this.get = function (req, res) {
            _this._boxClientLocal.search
                .query(req.query.name, {
                // fields: "name,shared_link,permissions,collections,sync_state",
                type: req.query.type,
                ancestor_folder_ids: req.query.ancestor_folder_id
            })
                .then(function (results) {
                return res.json(results);
            })["catch"](function (err) {
                return res.json(err);
            });
        }; //end get
        this._boxClientLocal = boxClient;
    } //end constructor
    return SearchMethods;
}()); //end class SearchMethods
// export default function (boxClient: any): Router {
//   const router: Router = Router();
//   const searchMethods = new SearchMethods(boxClient);
//   router.get("/:type/:name/:ancestorFolderId", searchMethods.get);
//   return router;
// };;
