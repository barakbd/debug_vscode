"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createRoutes = (boxClient) => {
    const router = express_1.Router();
    const folderMethods = new FolderMethods(boxClient);
    router.get("/:id", folderMethods.get);
    router.post("/", folderMethods.create);
    router.get("/:id/items", folderMethods.getItems);
    return router;
};
class FolderMethods {
    constructor(boxClient) {
        this.get = (req, res) => {
            this._boxClientLocal.folders
                .get(req.params.id, {
                fields: "name,shared_link,permissions,collections,sync_state"
            })
                .then((folderInfo) => {
                console.log("sdsdsdsdsd");
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
        this._boxClientLocal = boxClient;
    }
}
exports.default = createRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2ZXIvY29udHJvbGxlcnMvYm94L2ZvbGRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FNaUI7QUFHakIsTUFBTSxZQUFZLEdBQWEsQ0FBQyxTQUFjLEVBQVUsRUFBRTtJQUN4RCxNQUFNLE1BQU0sR0FBVyxnQkFBTSxFQUFFLENBQUM7SUFFaEMsTUFBTSxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakQsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUM7QUFFRjtJQUdFLFlBQVksU0FBYztRQUluQixRQUFHLEdBQUcsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7WUFDM0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPO2lCQUN6QixHQUFHLENBQXFCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO2dCQUN0QyxNQUFNLEVBQUUscURBQXFEO2FBQzlELENBQUM7aUJBQ0QsSUFBSSxDQUFDLENBQUMsVUFBZSxFQUFFLEVBQUU7Z0JBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7Z0JBQ3pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO29CQUNkLE1BQU0sRUFBRSxHQUFHO29CQUNYLElBQUksRUFBRSxVQUFVO2lCQUNqQixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7Z0JBQ2xCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDO1FBRUssV0FBTSxHQUFHLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBWSxFQUFFO1lBQ3hELEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUNoRCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDcEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ2QsTUFBTSxFQUFFLEdBQUc7b0JBQ1gsT0FBTyxFQUFFLDZCQUE2QjtpQkFDdkMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU87aUJBQ2hDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7aUJBQy9CLElBQUksQ0FBQyxDQUFDLFVBQWUsRUFBRSxFQUFFO2dCQUN4QixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDZCxNQUFNLEVBQUUsR0FBRztvQkFDWCxJQUFJLEVBQUUsVUFBVTtpQkFDakIsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO2dCQUNsQixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQztRQUVLLGFBQVEsR0FBRyxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQVksRUFBRTtZQUMxRCxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPO2lCQUNoQyxRQUFRLENBQXFCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO2dCQUMzQyxNQUFNLEVBQUUscURBQXFEO2FBQzlELENBQUM7aUJBQ0QsSUFBSSxDQUFDLENBQUMsVUFBZSxFQUFFLEVBQUU7Z0JBQ3hCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO29CQUNkLE1BQU0sRUFBRSxHQUFHO29CQUNYLElBQUksRUFBRSxVQUFVO2lCQUNqQixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7Z0JBQ2xCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDO1FBekRBLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO0lBQ25DLENBQUM7Q0EwREY7QUFFRCxrQkFBZSxZQUFZLENBQUMifQ==