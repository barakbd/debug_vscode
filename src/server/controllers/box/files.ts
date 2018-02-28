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

  const fileMethods = new FileMethods(boxClient);
  router.post("/", fileMethods.create);
  router.get("/:id", fileMethods.get);
  router.get("/:id/items", fileMethods.getItems);
  return router;
};

export default createRoutes;

class FileMethods {
  private _boxClientLocal: any;

  constructor(boxClient: any) {
    this._boxClientLocal = boxClient;
  } //end constructor

  public create = (req: Request, res: Response): Response => {
    return this._boxClientLocal.files
      .create(req.body.ancestor_file_id, req.body.file_to_create)
      .then((fileInfo: any) => {
        return res.status(200).json(fileInfo);
      })
      .catch((err: any) => {
        return res.status(400).json(err);
      });
  }; //end create

  public get = (req: Request, res: Response) => {
    this._boxClientLocal.files
      .get(/* "45416054928" */ req.params.id, {
        fields: "name,shared_link,permissions,collections,sync_state"
      })
      .then((fileInfo: any) => {
        return res.status(200).json(fileInfo);
      })
      .catch((err: any) => {
        return res.status(400).json(err);
      });
  }; //end get

  public getItems = (req: Request, res: Response): Response => {
    return this._boxClientLocal.files
      .getItems(/* "45416054928" */ req.params.id, {
        fields: "name,shared_link,permissions,collections,sync_state"
      })
      .then((fileInfo: any) => {
        return res.status(200).json(fileInfo);
      })
      .catch((err: any) => {
        return res.status(400).json(err);
      });
  }; //end getItems

} //end class FileMethods
