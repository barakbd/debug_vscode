/*
https://stackoverflow.com/questions/45023624/how-to-require-multiple-controllers-with-express
https://www.terlici.com/2014/09/29/express-router.html
 */
// declare function require(moduleName: string): any;

import { Router, Express } from "express";
import { readdirSync } from "fs";
import { join, basename} from "path";
import { boxServiceAccountClient } from "./box_service_account";

const appRouter: Router = Router();

readdirSync(join(__dirname, "../controllers/box"))
  .filter(f => f !== "*.spec.ts")
  .forEach(controllerFile => {
    const controllerBaseName = basename(controllerFile, ".js")
    import(`../controllers/box/${controllerBaseName}`).then(controller=>{
      // const routes = controller.default(boxServiceAccountClient)
      appRouter.use(
        `/box/${controllerBaseName}`, controller.default(boxServiceAccountClient))
    })
  }); //end forEach

export { appRouter };
