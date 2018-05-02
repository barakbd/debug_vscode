/*
https://stackoverflow.com/questions/45023624/how-to-require-multiple-controllers-with-express
https://www.terlici.com/2014/09/29/express-router.html
 */
import { Router, Express } from "express";
import { readdirSync } from "fs";
import { join, basename } from "path";

const prefix = "server_prefix";
const appRouter: Router = Router();

readdirSync(join(__dirname, "../controllers"))
  .filter((fileName: string) => {
    return fileName != "**.spec.js" && fileName !== "standardResponses.js";
  })
  .forEach(controllerFile => {
    const controllerBaseName = basename(controllerFile, ".js");
    // require(`../controllers/box/${controllerBaseName}`)
    import(`../controllers/${controllerBaseName}`)
      .then(controller => {
        appRouter.use(`/${controllerBaseName}`, controller.default(prefix));
      })
      .catch(error => {
        console.log(error);
      });
  }); //end forEach

export { appRouter };
