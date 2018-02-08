"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = require("fs");
const path_1 = require("path");
const box_service_account_1 = require("./box_service_account");
const appRouter = express_1.Router();
exports.appRouter = appRouter;
fs_1.readdirSync(path_1.join(__dirname, "../controllers/box"))
    .filter(f => f !== "*.spec.ts")
    .forEach(controllerFile => {
    const controllerBaseName = path_1.basename(controllerFile, ".js");
    Promise.resolve().then(() => require(`../controllers/box/${controllerBaseName}`)).then(controller => {
        appRouter.use(`/box/${controllerBaseName}`, controller.default(box_service_account_1.boxServiceAccountClient));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZlci9jb25maWcvcm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBTUEscUNBQTBDO0FBQzFDLDJCQUFpQztBQUNqQywrQkFBcUM7QUFDckMsK0RBQWdFO0FBRWhFLE1BQU0sU0FBUyxHQUFXLGdCQUFNLEVBQUUsQ0FBQztBQWExQiw4QkFBUztBQVhsQixnQkFBVyxDQUFDLFdBQUksQ0FBQyxTQUFTLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztLQUMvQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssV0FBVyxDQUFDO0tBQzlCLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRTtJQUN4QixNQUFNLGtCQUFrQixHQUFHLGVBQVEsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDMUQscUNBQU8sc0JBQXNCLGtCQUFrQixFQUFFLEdBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQSxFQUFFO1FBRWxFLFNBQVMsQ0FBQyxHQUFHLENBQ1gsUUFBUSxrQkFBa0IsRUFBRSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsNkNBQXVCLENBQUMsQ0FBQyxDQUFBO0lBQzlFLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUMifQ==