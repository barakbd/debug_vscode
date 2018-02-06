/*
https://stackoverflow.com/questions/45023624/how-to-require-multiple-controllers-with-express
https://www.terlici.com/2014/09/29/express-router.html
 */
import * as express from "express";
import * as fs from "fs";
import * as path from "path";

const router: express.Router = express.Router();
import { boxServiceAccountClient } from "./box_service_account";

const boxControllers: string[] = fs
  .readdirSync(path.join(__dirname, "../controllers/box"))
  .filter(f => f !== "link_card_folder.js");

boxControllers.forEach(controller => {
  router.use(
    "/box",
    require(`../controllers/box/${controller}`)(boxServiceAccountClient)
  );
});
export {router};
