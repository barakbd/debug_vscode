import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler
} from "express";
import * as mongoose from "mongoose";
import { File, FileModel } from "../models/File";
import { InstanceType } from "typegoose";

class FileRoutes {
  static instance: FileRoutes;
  private _router: Router;
  private _prefix: string;

  constructor(prefix: string) {
    this._prefix = prefix;
    this._router = Router();
    //Routes
    this._router.post("/", this._create);
    this._router.get("/:id", this._get);
  } //end constructor

  //return singleton
  static getRouter(boxClient: any): Router {
    this.instance === undefined
      ? (this.instance = new FileRoutes(boxClient))
      : (this.instance = this.instance);
    return this.instance._router;
  }

  /******************* PRIVATE METHODS ****************/

  private _create: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    let newFile: InstanceType<File> = new FileModel();
    newFile.file_name = this._prefix + req.body.file_name;

    return newFile
      .save()
      .then((newFileSaveSuccess: InstanceType<File> | Document) => {
        return res.status(200).json(newFileSaveSuccess);
      })
      .catch((newFileSaveError: mongoose.Error) => {
        // next(newFileSaveError);
        return res.status(400).json(newFileSaveError);
      });
  }; //end _create

  private _get: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    return FileModel.findById(req.params.id)
      .then(file => {
        return res.status(200).json(file);
      })
      .catch(next);
  }; //end _get
} //end class FileMethods

export default (prefix: string): Router => {
  return FileRoutes.getRouter(prefix);
};
