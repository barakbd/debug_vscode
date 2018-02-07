/*
https://stackoverflow.com/questions/45023624/how-to-require-multiple-controllers-with-express
https://www.terlici.com/2014/09/29/express-router.html
 */
// declare function require(moduleName: string): any;

import { Router, Express } from "express";
import { readdirSync } from "fs";
import { join } from "path";
import { boxServiceAccountClient } from "./box_service_account";
import folderRoutes from "../controllers/box/folder";

const appRouter: Router = Router();

readdirSync(
  join(__dirname, "../controllers/box")
).filter(f => f !== "*.spec.ts").forEach(controller => {
  const routes = import(`../controllers/box/${controller}`).then()
  appRouter.use(
    "/box",
    import(`../controllers/box/${controller}`).then(createRoutes => {
      return createRoutes(boxServiceAccountClient);
    })
    /*     import(`../controllers/box/${controller}`).then(boxController=>{
      new boxController(boxServiceAccountClient)
    })
 */
  );
});

export { appRouter };
