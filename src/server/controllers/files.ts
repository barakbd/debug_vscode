import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler
} from "express";
import * as mongoose from "mongoose";
import { File, FileModel } from "../models/File";

//Needed for handling files
import * as multer from "multer";
import { InstanceType } from "typegoose";
const upload: multer.Instance = multer({ storage: multer.memoryStorage() });

class FileRoutes {
  static instance: FileRoutes;
  private _router: Router;
  private _boxClientLocal: any;

  constructor(boxClient: any) {
    this._boxClientLocal = boxClient;
    this._router = Router();
    //Routes
    this._router.post(
      "/:target_folder_id",
      upload.single("file"),
      this._create
    );
    // this._router.get("/:mongo_file_id", this._get);
    
    this._router.post(
      "/pipe/:target_folder_id",
      (req, res)=>{

      }
    );

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
  ): Response => {
    // const file: Express.Multer.File = req.file;
    // const fileBuffer: Buffer = file.buffer; - informative

    return this._boxClientLocal.files
      .uploadFile(
        req.params.target_folder_id,
        req.file.originalname,
        req.file.buffer
      )
      .then((uploadFileSuccess: any) => {
        this._boxClientLocal.files
          .update(uploadFileSuccess.entries[0].id, {
            shared_link: this._boxClientLocal.accessLevels.DEFAULT
          })
          .then((updatedFileCuccess: any) => {
            let newFile: InstanceType<File> = new FileModel();
            newFile.metadata = updatedFileCuccess;
            newFile
              .save()
              .then((newFileSaveSuccess: InstanceType<File> | Document) => {
                res.status(200).json(newFileSaveSuccess);
              });
          })
          .catch((newFileSaveError: mongoose.Error) => {
            // next(newFileSaveError);
            return res.status(400).json(newFileSaveError);
          })
          .catch((updateFileError: any) => {
            return res.status(updateFileError.statusCode).json(updateFileError);
          });
      })
      .catch((uploadError: any) => {
        return res.status(uploadError.statusCode).json(uploadError);
      });
  }; //end _create

  // private _get: RequestHandler = (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<Response | void> => {
  //   return FileModel.findById(req.params.mongo_file_id)
  //     .then((fileDocument: InstanceType<File>) => {
  //       return res.status(200).json(fileDocument);
  //     })
  //     .catch((err: any) => next(err));
  // }; //end _get
} //end class FileMethods

export default (boxClient: any): Router => {
  return FileRoutes.getRouter(boxClient);
};
