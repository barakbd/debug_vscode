/*
https://stackoverflow.com/questions/45023624/how-to-require-multiple-controllers-with-express
https://www.terlici.com/2014/09/29/express-router.html
 */
// declare function require(moduleName: string): any;
import { Router, Express } from "express";
import { readdirSync } from "fs";
import { join, basename } from "path";
import { boxServiceAccountClient } from "./box_service_account";

const appRouter: Router = Router();
/* 
import createRoutesFolder from "../controllers/box/folders";
appRouter.use("/box/folders", createRoutesFolder(boxServiceAccountClient));
 */

 
/* import createRoutesFolder from "../controllers/box/search";
appRouter.use("/box/search", createRoutesFolder(boxServiceAccountClient));
 */


 readdirSync(join(__dirname, "../controllers"))
  .filter((fileName: string) => {
    return (fileName !=="**.spec.**")/*  && (fileName !== "search.js") */;
  })
  .forEach(controllerFile => {
    const controllerBaseName = basename(controllerFile, ".js");
    // require(`../controllers/box/${controllerBaseName}`)
     import(`../controllers/${controllerBaseName}`)
      .then(controller => {
        appRouter.use(
          `/${controllerBaseName}`,
          controller.default(boxServiceAccountClient)
        );
      })
      .catch(error => {
        console.log(error);
      });
  }); //end forEach 


export { appRouter };
