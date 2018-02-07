import * as express from "express";
const router: express.Router = express.Router();

export default function(boxClient: any) {
    const folderMethods = new FolderMethods(boxClient);
    router.post("/folder", folderMethods.create);
    router.get("/folder/:id", folderMethods.get);
    router.get("/folder/:id/items", folderMethods.getItems);
    router.get("/folder/search/:folder_name", folderMethods.search);
  
    return router;
  }; //end folderRoutes
  
// export default
export class FolderMethods {
  public boxClient: any;

  constructor(boxClient: any) {
    this.boxClient = boxClient;
  } //end constructor

  public create(req: express.Request, res: express.Response) {
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

  public get(req: express.Request, res: express.Response) {
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

  public getItems(req: express.Request, res: express.Response) {
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

  public search(req: express.Request, res: express.Response) {
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