import {
  Router,
  Request,
  Response
  // NextFunction,
  // RequestHandler
} from "express";

// import * as defaultExport from "../route-controller-module"
const createRoutes: Function = (boxClient: any): Router => {
  const router: Router = Router();

  const folderMethods = new FolderMethods(boxClient);
  router.get("/:id", folderMethods.get);
  router.post("/", folderMethods.create);
  router.get("/:id/items", folderMethods.getItems);
  return router;
};

class FolderMethods {
  private _boxClientLocal: any;

  constructor(boxClient: any) {
    this._boxClientLocal = boxClient;
  } //end constructor

  public get = (req: Request, res: Response) => {
    this._boxClientLocal.folders
      .get(/* "45416054928" */ req.params.id, {
        fields: "name,shared_link,permissions,collections,sync_state"
      })
      .then((folderInfo: any) => {
        console.log("sdsdsdsdsd")
        return res.json({
          status: 200,
          data: folderInfo
        });
      })
      .catch((err: any) => {
        return res.json(err);
      });
  }; //end get

  public create = (req: Request, res: Response): Response => {
    if (!req.body || !req.body.folder_name) {
      return res.json("can't add empty folderName");
    } else if (typeof req.body.folder_name !== "string") {
      return res.json({
        status: 400,
        message: "folderName must be a string"
      });
    }

    return this._boxClientLocal.folders
      .create(0, req.body.folder_name)
      .then((folderInfo: any) => {
        return res.json({
          status: 400,
          data: folderInfo
        });
      })
      .catch((err: any) => {
        return res.json(err);
      });
  }; //end create

  public getItems = (req: Request, res: Response): Response => {
    return this._boxClientLocal.folders
      .getItems(/* "45416054928" */ req.params.id, {
        fields: "name,shared_link,permissions,collections,sync_state"
      })
      .then((folderInfo: any) => {
        return res.json({
          status: 200,
          data: folderInfo
        });
      })
      .catch((err: any) => {
        return res.json(err);
      });
  }; //end getItems

} //end class FolderMethods

export default createRoutes;

