import {
  Router,
  Request,
  Response,
  // NextFunction,
  // RequestHandler
} from "express";

export default function (boxClient: any) : Router{
  const router: Router = Router();

  const folderMethods = new FolderMethods(boxClient);
  router.get("/:id", folderMethods.get);
  router.post("/", folderMethods.create);
  router.get("/:id/items", folderMethods.getItems);
  return router;
}

export class FolderMethods {
  private _boxClientLocal: any;

  constructor(boxClient: any) {
    this._boxClientLocal = boxClient;
  } //end constructor

  public get = (req: Request, res: Response) =>{
    this._boxClientLocal.folders
      .get(/* "45416054928" */ req.params.id, {
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
  } //end get

  public create = (req: Request, res: Response):Response =>{
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
  } //end create

  public getItems = (req: Request, res: Response): Response =>{
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
  } //end getItems

  public search = (req: Request, res: Response):Promise<Response> =>{
    return this._boxClientLocal.search
      .query(req.params.folder_name, {
        fields:
          "name,modified_at,size,extension,permissions,sync_state, collections",
        type: "folder",
        ancestor_folder_ids: 0,
        limit: 5,
        offset: 0
      })
      .then((folders: any[]) => {
        return res.json({
          status: 200,
          data: folders
        });
      })
      .catch((err: any) => {
        return res.json(err);
      });
  } //end search
} //end class FolderMethods