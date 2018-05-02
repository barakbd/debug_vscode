import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler
} from "express";
import * as mongoose from "mongoose";
import { Folder, FolderModel } from "../models/Folder";
import { InstanceType } from "typegoose";

class FolderRoutes {
  static instance: FolderRoutes;
  private _router: Router;
  private _prefix: string;

  constructor(prefix: string) {
    this._prefix = prefix;
    this._router = Router();
    //Routes
    this._router.post("/", this._create);
    this._router.get("/:folder_name", this._get);
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
  ): Promise<Response> => {
    let newFolder: InstanceType<Folder> = new FolderModel();
    newFolder.folder_name = this._prefix + req.body.folder_name;

    return newFolder
      .save()
      .then((newFolderSaveSuccess: InstanceType<Folder> | Document) => {
        return res.status(200).json(newFolderSaveSuccess);
      })
      .catch((newFolderSaveError: mongoose.Error) => {
        // next(newFolderSaveError);
        return res.status(400).json(newFolderSaveError);
      });
  }; //end _create

  private _get: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    return FolderModel.find({
      folder_name: this._prefix + req.params.folder_name
    })
      .then(folder => {
        return res.status(200).json(folder);
      })
      .catch(err => {
        // next(newFolderSaveError);
        return res.status(400).json(err);
      });
  }; //end _get
} //end class FolderMethods

export default (prefix: string): Router => {
  return FolderRoutes.getRouter(prefix);
};
