"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
function default_1(boxClient) {
    const router = express_1.Router();
    const folderMethods = new FolderMethods(boxClient);
    router.get("/folders/:id", folderMethods.get);
    router.post("/folders", folderMethods.create);
    router.get("/folders/:id/items", folderMethods.getItems);
    router.get("/folders/search/:folder_name", folderMethods.search);
    return router;
}
exports.default = default_1;
class FolderMethods {
    constructor(boxClient) {
        this.get = (req, res) => {
            console.log("get folders");
            this.boxClientLocal.folders
                .get(req.params.id, {
                fields: "name,shared_link,permissions,collections,sync_state"
            })
                .then((folderInfo) => {
                return res.json({
                    status: 200,
                    data: folderInfo
                });
            })
                .catch((err) => {
                return res.json(err);
            });
        };
        this.create = (req, res) => {
            if (!req.body || !req.body.folder_name) {
                return res.json("can't add empty folderName");
            }
            else if (typeof req.body.folder_name !== "string") {
                return res.json({
                    status: 400,
                    message: "folderName must be a string"
                });
            }
            this.boxClientLocal.folders
                .create(0, req.body.folder_name)
                .then((folderInfo) => {
                return res.json({
                    status: 400,
                    data: folderInfo
                });
            })
                .catch((err) => {
                return res.json(err);
            });
        };
        this.boxClientLocal = boxClient;
    }
    getItems(req, res) {
        this.boxClientLocal.folders
            .getItems(req.params.id, {
            fields: "name,shared_link,permissions,collections,sync_state"
        })
            .then((folderInfo) => {
            return res.json({
                status: 200,
                data: folderInfo
            });
        })
            .catch((err) => {
            return res.json(err);
        });
    }
    search(req, res) {
        this.boxClientLocal.search
            .query(req.params.folder_name, {
            fields: "name,modified_at,size,extension,permissions,sync_state, collections",
            type: "folder",
            ancestor_folder_ids: 0,
            limit: 5,
            offset: 0
        })
            .then((folders) => {
            return res.json({
                status: 200,
                data: folders
            });
        })
            .catch((err) => {
            return res.json(err);
        });
    }
}
exports.FolderMethods = FolderMethods;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9jb250cm9sbGVycy9ib3gvZm9sZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBTWlCO0FBRWpCLG1CQUF5QixTQUFjO0lBQ3JDLE1BQU0sTUFBTSxHQUFXLGdCQUFNLEVBQUUsQ0FBQztJQUVoQyxNQUFNLGFBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNuRCxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlDLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pFLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQVRELDRCQVNDO0FBRUQ7SUFHRSxZQUFZLFNBQWM7UUFJbkIsUUFBRyxHQUFHLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO1lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7WUFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPO2lCQUN4QixHQUFHLENBQXFCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO2dCQUN0QyxNQUFNLEVBQUUscURBQXFEO2FBQzlELENBQUM7aUJBQ0QsSUFBSSxDQUFDLENBQUMsVUFBZSxFQUFFLEVBQUU7Z0JBQ3hCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO29CQUNkLE1BQU0sRUFBRSxHQUFHO29CQUNYLElBQUksRUFBRSxVQUFVO2lCQUNqQixDQUFDLENB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