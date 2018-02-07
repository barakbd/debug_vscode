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
    appRouter.use("/box", Promise.resolve().then(() => require(`../controllers/box/${controller}`)).then(createRoutes => {
        return createRoutes(box_service_account_1.boxServiceAccountClient);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZlci9jb25maWcvcm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBTUEscUNBQTBDO0FBQzFDLDJCQUFpQztBQUNqQywrQkFBNEI7QUFDNUIsK0RBQWdFO0FBR2hFLE1BQU0sU0FBUyxHQUFXLGdCQUFNLEVBQUUsQ0FBQztBQW9CMUIsOEJBQVM7QUFsQmxCLE1BQU0sY0FBYyxHQUFhLGdCQUFXLENBQzFDLFdBQUksQ0FBQyxTQUFTLEVBQUUsb0JBQW9CLENBQUMsQ0FDdEMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUM7QUFHakMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtJQUNsQyxTQUFTLENBQUMsR0FBRyxDQUNYLE1BQU0sRUFDTixxQ0FBTyxzQkFBc0IsVUFBVSxFQUFFLEdBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQzdELE1BQU0sQ0FBQyxZQUFZLENBQUMsNkNBQXVCLENBQUMsQ0FBQztJQUMvQyxDQUFDLENBQUMsQ0FLSCxDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUMifQ==