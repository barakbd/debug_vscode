"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
function folderRoutes(boxClient) {
    const router = express_1.Router();
    const folderMethods = new FolderMethods(boxClient);
    router.post("/folders", folderMethods.create);
    router.get("/folders/:id", folderMethods.get);
    router.get("/folders/:id/items", folderMethods.getItems);
    router.get("/folders/search/:folder_name", folderMethods.search);
    return router;
}
exports.default = folderRoutes;
class FolderMethods {
    constructor(boxClient) {
        boxClient = boxClient;
    }
    create(req, res) {
        if (!req.body || !req.body.folder_name) {
            return res.json("can't add empty folderName");
        }
        else if (typeof req.body.folder_name !== "string") {
            return res.json({
                status: 400,
                message: "folderName must be a string"
            });
        }
        this.boxClient.folders
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
    }
    get(req, res) {
        this.boxClient.folders
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
    }
    getItems(req, res) {
        this.boxClient.folders
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
        this.boxClient.search
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9jb250cm9sbGVycy9ib3gvc2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBTWlCO0FBRWpCLHNCQUFxQyxTQUFjO0lBQ2pELE1BQU0sTUFBTSxHQUFXLGdCQUFNLEVBQUUsQ0FBQztJQUVoQyxNQUFNLGFBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlDLE1BQU0sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pFLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQVRELCtCQVNDO0FBRUQ7SUFHRSxZQUFZLFNBQWM7UUFDeEIsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRU0sTUFBTSxDQUFDLEdBQVksRUFBRSxHQUFhO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxHQUFHLENB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