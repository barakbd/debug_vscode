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

  const collaborationMethods = new CollaborationMethods(boxClient);
  router.get("/:id", collaborationMethods.get);
  router.post("/", collaborationMethods.create);
  router.post("/createEditor", collaborationMethods.createEditor);
  router.get("/:id/items", collaborationMethods.getItems);
  router.put("/", collaborationMethods.update);
  return router;
};

class CollaborationMethods {
  private _boxClientLocal: any;

  constructor(boxClient: any) {
    this._boxClientLocal = boxClient;
  } //end constructor

  public get = (req: Request, res: Response) => {
    this._boxClientLocal.collaborations
      .get(/* "45416054928" */ req.params.id)
      .then((collaborationInfo: any) => {
        console.log("sdsdsdsdsd")
        return res.json({
          status: 200,
          data: collaborationInfo
        });
      })
      .catch((err: any) => {
        return res.json(err);
      });
  }; //end get

  public create = (req: Request, res: Response): Response => {
    if (!req.body || !req.body.folder_id || !req.body.user_id) {
      return res.json({
        status: 400,
        message: "can't add empty folder_id or user_id"
      });
    } else if (typeof req.body.folder_id !== "string" || typeof req.body.user_id !== "string") {
      return res.json({
        status: 400,
        message: "folder_id or user_id must be a string"
      });
    }

    return this._boxClientLocal.collaborations.createWithUserEmail(req.body.user_id, req.body.folder_id, this._boxClientLocal.collaborationRoles.VIEWER, { notify: false })
      .then((collaborationInfo: any) => {
        return res.json({
          status: 400,
          data: collaborationInfo
        });
      })
      .catch((err: any) => {
        return res.json(err);
      });
  }; //end create

    public createEditor = (req: Request, res: Response): Response => {
    if (!req.body || !req.body.folder_id || !req.body.user_id) {
      return res.json({
        status: 400,
        message: "can't add empty folder_id or user_id"
      });
    } else if (typeof req.body.folder_id !== "string" || typeof req.body.user_id !== "string") {
      return res.json({
        status: 400,
        message: "folder_id or user_id must be a string"
      });
    }

    return this._boxClientLocal.collaborations.createWithUserEmail(req.body.user_id, req.body.folder_id, this._boxClientLocal.collaborationRoles.EDITOR, { notify: false })
      .then((collaborationInfo: any) => {
        return res.json({
          status: 400,
          data: collaborationInfo
        });
      })
      .catch((err: any) => {
        return res.json(err);
      });
  }; //end create

  public update = (req: Request, res: Response): Response => {
    if (!req.body || !req.body.collaboration_id) {
      return res.json({
        status: 400,
        message: "can't add empty collaboration_id"
      });
    } else if (typeof req.body.collaboration_id !== "string") {
      return res.json({
        status: 400,
        message: "collaboration_id must be a string"
      });
    }

    return this._boxClientLocal.collaborations.update(req.body.collaboration_id, { role: this._boxClientLocal.collaborationRoles.EDITOR })
      .then((collaborationInfo: any) => {
        return res.json({
          status: 400,
          data: collaborationInfo
        });
      })
      .catch((err: any) => {
        return res.json(err);
      });
  }; //end update

  public getItems = (req: Request, res: Response): Response => {
    return this._boxClientLocal.collaborations
      .getItems(/* "45416054928" */ req.params.id, {
        fields: "name,shared_link,permissions,collections,sync_state"
      })
      .then((collaborationInfo: any) => {
        return res.json({
          status: 200,
          data: collaborationInfo
        });
      })
      .catch((err: any) => {
        return res.json(err);
      });
  }; //end getItems

} //end class  CollaborationMethods

export default createRoutes;

