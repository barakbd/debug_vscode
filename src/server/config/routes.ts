/*
https://stackoverflow.com/questions/45023624/how-to-require-multiple-controllers-with-express
https://www.terlici.com/2014/09/29/express-router.html
 */
// declare function require(moduleName: string): any;

import { Router, Express } from "express";
import { readdirSync } from "fs";
import {join} from "path";
import {boxServiceAccountClient} from "./box_service_account";
// import {folderRoutes} from "../controllers/box/folder";

const appRouter: Router = Router();

const boxControllers: string[] = readdirSync(
  join(__dirname, "../controllers/box")
).filter(f => f !== "*.spec.ts");

// appRouter.use("/box", folderRoutes(boxServiceAccountClient))
boxControllers.forEach(controller => {
  appRouter.use(
    "/box",
    require(`../controllers/box/${controller}`).default(boxServiceAccountClient)
/*     import(`../controllers/box/${controller}`).then(boxController=>{
      new boxController(boxServiceAccountClient)
    })
 */  );
});
 
export {appRouter};
