// https://github.com/box/box-node-sdk/blob/master/docs/files.md#upload-a-file
// http://qnimate.com/stream-file-uploads-to-storage-server-in-node-js/

import {
  Router,
  Request,
  Response
  // NextFunction,
  // RequestHandler
} from "express";

import * as multiparty from "multiparty"

const createRoutes: Function = (boxClient: any): Router => {
  const router: Router = Router();

  const fileMethods = new FileMethods(boxClient);
  router.post("/", fileMethods.create);
  router.get("/:id", fileMethods.get);
  return router;
};

export default createRoutes;

class FileMethods {
  private _boxClientLocal: any;

  constructor(boxClient: any) {
    this._boxClientLocal = boxClient;
  } //end constructor

  public create = (req: Request, res: Response) => {
    const multipartyForm: multiparty.Form = new multiparty.Form();
    multipartyForm.on("part", (part: multiparty.Part)=>{
      if (part.filename){
        console.log(part);
        return res.json()
      }
    })
    multipartyForm.on("error", function(error) {
      console.log(error);
    });
    //start parsing
    multipartyForm.parse(req);
    // return this._boxClientLocal.files
    //   .uploadFile(req.body.file, req.body.new_file_name)
    //   .then((fileInfo: any) => {
    //     return res.status(200).json(fileInfo);
    //   })
    //   .catch((err: any) => {
    //     return res.status(err.statusCode).json(err);
    //   });
  }; //end create

  public get = (req: Request, res: Response) => {
    this._boxClientLocal.files
      .get(req.params.id)
      .then((fileInfo: any) => {
        return res.status(200).json(fileInfo);
      })
      .catch((err: any) => {
        return res.status(err.statusCode).json(err);
      });
  }; //end get

} //end class FileMethods
