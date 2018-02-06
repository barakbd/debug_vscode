"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
function default_1(client) {
    const folderMethods = {
        create: function (req, res) {
            if (!req.body || !req.body.folder_name) {
                return res.json("can't add empty folderName");
            }
            else if (typeof req.body.folder_name !== "string") {
                return res.json({
                    status: 400,
                    message: "folderName must be a string"
                });
            }
            client.folders.create(0, req.body.folder_name).then((folderInfo) => {
                return res.json({
                    status: 400,
                    data: folderInfo
                });
            }).catch((err) => {
                return res.json(err);
            });
        },
        get: function (req, res) {
            client.folders.get(req.params.id, {
                fields: 'name,shared_link,permissions,collections,sync_state'
            }).then((folderInfo) => {
                return res.json({
                    status: 200,
                    data: folderInfo
                });
            }).catch((err) => {
                return res.json(err);
            });
        },
        getItems: function (req, res) {
            client.folders.getItems(req.params.id, {
                fields: 'name,shared_link,permissions,collections,sync_state'
            }).then((folderInfo) => {
                return res.json({
                    status: 200,
                    data: folderInfo
                });
            }).catch((err) => {
                return res.json(err);
            });
        },
        search: function (req, res) {
            client.search.query(req.params.folder_name, {
                fields: 'name,modified_at,size,extension,permissions,sync_state, collections',
                type: 'folder',
                ancestor_folder_ids: 0,
                limit: 5,
                offset: 0,
            }).then((folders) => {
                return res.json({
                    status: 200,
                    data: folders
                });
            }).catch((err) => {
                return res.json(err);
            });
        }
    };
    const express = require('express'), router = express.Router();
    router.post("/folder", folderMethods.create);
    router.get("/folder/:id", folderMethods.get);
    router.get("/folder/:id/items", folderMethods.getItems);
    router.get("/folder/search/:folder_name", folderMethods.search);
    return router;
}
exports.default = default_1;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9jb250cm9sbGVycy9ib3gvZm9sZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQW1DO0FBQ25DLE1BQU0sTUFBTSxHQUFtQixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEQsbUJBQXdCLE1BQVc7SUFFL0IsTUFBTSxhQUFhLEdBQUc7UUFDbEIsTUFBTSxFQUFFLFVBQVMsR0FBb0IsRUFBRSxHQUFxQjtZQUN4RCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUE7WUFDakQsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO29CQUNaLE1BQU0sRUFBRSxHQUFHO29CQUNYLE9BQU8sRUFBRSw2QkFBNkI7aUJBQ3pDLENBQUMsQ0FBQTtZQUNOLENBQUM7WUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFlLEVBQUUsRUFBRTtnQkFDcEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ1osTUFBTSxFQUFFLEdBQUc7b0JBQ1gsSUFBSSxFQUFFLFVBQVU7aUJBQ25CLENBQUMsQ0FBQTtZQUNOLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO2dCQUNsQixNQUFNLENBQUMsR0FBRyxD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