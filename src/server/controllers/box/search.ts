import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler
} from "express";

export default function folderRoutes(boxClient: any) : Router{
  const router: Router = Router();

  const folderMethods = new FolderMethods(boxClient);
  router.post("/folders", folderMethods.create);
  router.get("/folders/:id", folderMethods.get);
  router.get("/folders/:id/items", folderMethods.getItems);
  router.get("/folders/search/:folder_name", folderMethods.search);
  return router;
}

class FolderMethods {
  private boxClient: any;

  constructor(boxClient: any) {
    boxClient = boxClient;
  } //end constructor

  public create(req: Request, res: Response) {
    if (!req.body || !req.body.folder_name) {
      return res.json("can't add empty folderName");
    } else if (typeof req.body.folder_name !== "string") {
      return res.json({
        status: 400,
        message: "folderName must be a string"
      });
    }

    this.boxClient.folders
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

  public get(req: Request, res: Response) {
    this.boxClient.folders
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

  public getItems(req: Request, res: Response) {
    this.boxClient.folders
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

  public search(req: Request, res: Response) {
    this.boxClient.search
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

/* export default class FolderRoutes {
  private folderRouter: Router;
  private folderMethods: FolderMethods;

  constructor(boxClient: any) {
    this.folderMethods = new FolderMethods(boxClient);
    this.folderRouter.post("/folder", this.folderMethods.create);
    this.folderRouter.get("/folder/:id", this.folderMethods.get);
    this.folderRouter.get("/folder/:id/items", this.folderMethods.getItems);
    this.folderRouter.get(
      "/folder/search/:folder_name",
      this.folderMethods.search
    );
  } //end constructor
} //end class FolderRoutes
;
 */