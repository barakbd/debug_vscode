// https://github.com/box/box-node-sdk/blob/master/docs/files.md#upload-a-file

import {
  Router,
  Request,
  Response
  // NextFunction,
  // RequestHandler
} from "express";

import * as multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
// When encountering an error, multer will delegate the error to express.

const createRoutes: Function = (boxClient: any): Router => {
  const router: Router = Router();

  const fileMethods = new FileMethods(boxClient);
  router.post("/:parent_folder_id", upload.single("file"), fileMethods.create);
  router.get("/:box_file_id", fileMethods.get);
  router.put("/getSharedLink/:box_file_id", fileMethods.getSharedLink);
  return router;
};

export default createRoutes;

class FileMethods {
  private _boxClientLocal: any;

  constructor(boxClient: any) {
    this._boxClientLocal = boxClient;
  } //end constructor

  public create = (req: Request, res: Response) => {
    const file: Express.Multer.File = req.file;
    // const fileBuffer: Buffer = file.buffer; - informative

    this._boxClientLocal.files
      .uploadFile(req.params.parent_folder_id, file.originalname, file.buffer)
      .then((file: any) => {
        return res.status(200).json(file);
      })
      .catch((err: any) => {
        return res.status(err.statusCode).json(err);
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
} //end class FileMethods
