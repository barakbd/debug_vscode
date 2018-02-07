"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = require("fs");
const path_1 = require("path");
const box_service_account_1 = require("./box_service_account");
const appRouter = express_1.Router();
exports.appRouter = appRouter;
const boxControllers = fs_1.readdirSync(path_1.join(__dirname, "../controllers/box")).filter(f => f !== "*.spec.ts");
boxControllers.forEach(controller => {
    appRouter.use("/box", require(`../controllers/box/${controller}`).default(box_service_account_1.boxServiceAccountClient));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZlci9jb25maWcvcm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBTUEscUNBQTBDO0FBQzFDLDJCQUFpQztBQUNqQywrQkFBMEI7QUFDMUIsK0RBQThEO0FBRzlELE1BQU0sU0FBUyxHQUFXLGdCQUFNLEVBQUUsQ0FBQztBQWlCM0IsOEJBQVM7QUFmakIsTUFBTSxjQUFjLEdBQWEsZ0JBQVcsQ0FDMUMsV0FBSSxDQUFDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQyxDQUN0QyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQztBQUdqQyxjQUFjLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO0lBQ2xDLFNBQVMsQ0FBQyxHQUFHLENBQ1gsTUFBTSxFQUNOLE9BQU8sQ0FBQyxzQkFBc0IsVUFBVSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsNkNBQXVCLENBQUMsQ0FJMUUsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=