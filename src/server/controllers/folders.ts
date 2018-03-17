import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler
} from "express";

class FolderRoutes {
  static instance: FolderRoutes;
  private _router: Router;
  private _boxClientLocal: any;

  constructor(boxClient: any) {
    this._boxClientLocal = boxClient;
    this._router = Router();
    this._router.post("/", this._create);
    this._router.get("/:id", this._get);
    this._router.get("/:id/items", this._getItems);
  } //end constructor

  //return singleton
  static getRouter(boxClient: any): Router {
    this.instance === undefined
      ? (this.instance = new FolderRoutes(boxClient))
      : (this.instance = this.instance);
    return this.instance._router;
  }

  /******************* PRIVATE METHODS ****************/
  private _create: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response => {
    return this._boxClientLocal.folders
      .create(req.body.ancestor_folder_id, req.body.new_folder_name)
      .then((folderInfo: any) => {
        return res.status(200).json(folderInfo);
      })
      .catch((err: any) => {
        return res.status(err.statusCode).json(err);
      });
  }; //end create

  private _get: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response => {
    return this._boxClientLocal.folders
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

  private _getItems: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response => {
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

export default (boxClient: any): Router => {
  return FolderRoutes.getRouter(boxClient);
};
