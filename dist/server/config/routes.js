"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
exports.router = router;
const box_service_account_1 = require("./box_service_account");
const boxControllers = fs
    .readdirSync(path.join(__dirname, "../controllers/box"))
    .filter(f => f !== "link_card_folder.js");
boxControllers.forEach(controller => {
    router.use("/box", require(`../controllers/box/${controller}`)(box_service_account_1.boxServiceAccountClient));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZlci9jb25maWcvcm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsbUNBQW1DO0FBQ25DLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFFN0IsTUFBTSxNQUFNLEdBQW1CLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQWF4Qyx3QkFBTTtBQVpkLCtEQUFnRTtBQUVoRSxNQUFNLGNBQWMsR0FBYSxFQUFFO0tBQ2hDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0tBQ3ZELE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxxQkFBcUIsQ0FBQyxDQUFDO0FBRTVDLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7SUFDbEMsTUFBTSxDQUFDLEdBQUcsQ0FDUixNQUFNLEVBQ04sT0FBTyxDQUFDLHNCQUFzQixVQUFVLEVBQUUsQ0FBQyxDQUFDLDZDQUF1QixDQUFDLENBQ3JFLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyJ9