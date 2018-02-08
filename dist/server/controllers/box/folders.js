"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
function default_1(boxClient) {
    const router = express_1.Router();
    const folderMethods = new FolderMethods(boxClient);
    router.get("/:id", folderMethods.get);
    router.post("/", folderMethods.create);
    router.get("/:id/items", folderMethods.getItems);
    return router;
}
exports.default = default_1;
class FolderMethods {
    constructor(boxClient) {
        this.get = (req, res) => {
            this._boxClientLocal.folders
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
            return this._boxClientLocal.folders
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
        this.getItems = (req, res) => {
            return this._boxClientLocal.folders
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
        };
        this.search = (req, res) => {
            return this._boxClientLocal.search
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
        };
        this._boxClientLocal = boxClient;
    }
}
exports.FolderMethods = FolderMethods;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvY29udHJvbGxlcnMvYm94L2ZvbGRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FNaUI7QUFFakIsbUJBQXlCLFNBQWM7SUFDckMsTUFBTSxNQUFNLEdBQVcsZ0JBQU0sRUFBRSxDQUFDO0lBRWhDLE1BQU0sYUFBYSxHQUFHLElBQUksYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ25ELE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pELE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQVJELDRCQVFDO0FBRUQ7SUFHRSxZQUFZLFNBQWM7UUFJbkIsUUFBRyxHQUFHLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO1lBQzNDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTztpQkFDekIsR0FBRyxDQUFxQixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtnQkFDdEMsTUFBTSxFQUFFLHFEQUFxRDthQUM5RCxDQUFDO2lCQUNELElBQUksQ0FBQyxDQUFDLFVBQWUsRUFBRSxFQUFFO2dCQUN4QixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDZCxNQUFNLEVBQUUsR0FBRztvQkFDWCxJQUFJLEVBQUUsVUFBVTtpQkFDakIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO2dCQUNsQixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FB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