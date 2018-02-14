/*
https://stackoverflow.com/questions/45023624/how-to-require-multiple-controllers-with-express
https://www.terlici.com/2014/09/29/express-router.html
 */
// declare function require(moduleName: string): any;
import { Router, Express } from "express";
import { readdirSync } from "fs";
import { join, basename } from "path";
import { boxServiceAccountClient } from "./box_service_account";
import createRoutesFolder from "../controllers/box/folders";

const appRouter: Router = Router();
appRouter.use("/box/folders", createRoutesFolder(boxServiceAccountClient));

/* readdirSync(join(__dirname, "../controllers/box"))
  .filter((fileName: string) => {
    return (fileName !=="*.spec.*") && (fileName !== "search.js");
  })
  .forEach(controllerFile => {
    const controllerBaseName = basename(controllerFile, ".js");
    import(`../controllers/box/${controllerBaseName}`)
      .then(controller => {
        // if (typeof controller.default === "function") {
        //   console.log("******** - ", controller);
        // }
        appRouter.use(
          `/box/${controllerBaseName}`,
          controller.default(boxServiceAccountClient)
        );
      })
      .catch(error => {
        console.log(error);
      });
  }); //end forEach */

export { appRouter };
