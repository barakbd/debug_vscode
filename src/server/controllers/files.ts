// https://github.com/box/box-node-sdk/blob/master/docs/files.md#upload-a-file

import {
  Router,
  Request,
  Response,
  NextFunction
  // NextFunction,
  // RequestHandler
} from "express";

import * as multer from "multer";
import * as mongoose from "mongoose";
import { FileModel } from "../models/File";
// import { prop, Typegoose, ModelType, InstanceType } from "typegoose";


const upload = multer({ storage: multer.memoryStorage() });
// When encountering an error, multer will delegate the error to express.

const createRoutes: Function = (boxClient: any): Router => {
  const router: Router = Router();

  const fileMethods = new FileMethods(boxClient);
  router.post("/:parent_folder_id", upload.single("file"), fileMethods.create);
  router.get("/:box_file_id", fileMethods.get);
  // router.put("/getSharedLink/:box_file_id", fileMethods.getSharedLink);
  return router;
};

export default createRoutes;

class FileMethods {
  private _boxClientLocal: any;

  constructor(boxClient: any) {
    this._boxClientLocal = boxClient;
  } //end constructor

  public create = (req: Request, res: Response, next: NextFunction) => {
    const file: Express.Multer.File = req.file;
    // const fileBuffer: Buffer = file.buffer; - informative

    this._boxClientLocal.files
      .uploadFile(req.params.parent_folder_id, file.originalname, file.buffer)
      .then((uploadFileSuccess: any) => {
        this._boxClientLocal.files
          .update(uploadFileSuccess.entries[0].id, {
            shared_link: this._boxClientLocal.accessLevels.DEFAULT
          })
          .then((updatedFileCuccess: any) => {
            const newFile = new FileModel();
            newFile.file_name = updatedFileCuccess.name;
            newFile.metadata = updatedFileCuccess;
            newFile
              .save()
              .then((newFileSaveSuccess: mongoose.MongooseDocument) => {
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
  }; //end create

  public get = (req: Request, res: Response) => {
    this._boxClientLocal.files
      .get(req.params.box_file_id)
      .then((fileInfo: any) => {
        return res.status(200).json(fileInfo);
      })
      .catch((err: any) => {
        return res.status(err.statusCode).json(err);
      });
  }; //end get

  /*
  public getSharedLink = (req: Request, res: Response) => {
    this._boxClientLocal.files
      .update(req.params.box_file_id, {
        shared_link: this._boxClientLocal.accessLevels.DEFAULT,
      })
      .then((fileInfo: any) => {
        return res.status(200).json(fileInfo);
      })
      .catch((err: any) => {
        return res.status(err.statusCode).json(err);
      });
  }; //end get
*/
} //end class FileMethods
