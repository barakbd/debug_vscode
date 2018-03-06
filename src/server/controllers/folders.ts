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
  router.post("/", folderMethods.create);
  router.get("/:id", folderMethods.get);
  router.get("/:id/items", folderMethods.getItems);
  return router;
};

export default createRoutes;

class FolderMethods {
  private _boxClientLocal: any;

  constructor(boxClient: any) {
    this._boxClientLocal = boxClient;
  } //end constructor

  public create = (req: Request, res: Response): Response => {
    return this._boxClientLocal.folders
      .create(req.body.ancestor_folder_id, req.body.new_folder_name)
      .then((folderInfo: any) => {
        return res.status(200).json(folderInfo);
      })
      .catch((err: any) => {
        return res.status(err.statusCode).json(err);
      });
  }; //end create

  public get = (req: Request, res: Response) => {
    this._boxClientLocal.folders
      .get(/* "45416054928" */ req.params.id, {
        fields: "name,shared_link,permissions,collections,sync_state"
      })
      .then((folderInfo: any) => {
        return res.status(200).json(folderInfo);
      })
      .catch((err: any) => {
        return res.status(err.statusCode).json(err);
      });
  }; //end get

  public getItems = (req: Request, res: Response): Response => {
    return this._boxClientLocal.folders
      .getItems(/* "45416054928" */ req.params.id, {
        fields: "name,shared_link,permissions,collections,sync_state"
      })
      .then((folderInfo: any) => {
        return res.status(200).json(folderInfo);
      })
      .catch((err: any) => {
        return res.status(err.statusCode).json(err);
      });
  }; //end getItems

} //end class FolderMethods
