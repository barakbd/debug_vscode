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

  public create = (req: Request, res: Response): Response => {
    return this._boxClientLocal.files
      .create(req.body.ancestor_file_id, req.body.new_file_name)
      .then((fileInfo: any) => {
        return res.status(200).json(fileInfo);
      })
      .catch((err: any) => {
        return res.status(err.statusCode).json(err);
      });
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
