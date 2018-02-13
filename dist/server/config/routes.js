"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const box_service_account_1 = require("./box_service_account");
const folders_1 = require("../controllers/box/folders");
const appRouter = express_1.Router();
exports.appRouter = appRouter;
appRouter.use("/box/folders", folders_1.default(box_service_account_1.boxServiceAccountClient));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZlci9jb25maWcvcm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0EscUNBQTBDO0FBRzFDLCtEQUFnRTtBQUNoRSx3REFBNEQ7QUFFNUQsTUFBTSxTQUFTLEdBQVcsZ0JBQU0sRUFBRSxDQUFDO0FBd0IxQiw4QkFBUztBQXZCbEIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsaUJBQWtCLENBQUMsNkNBQXVCLENBQUMsQ0FBQyxDQUFDIn0=