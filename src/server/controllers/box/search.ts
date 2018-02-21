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

  const searchMethods = new SearchMethods(boxClient);
  router.get("/", searchMethods.get);
  return router;
};

export default createRoutes;


class SearchMethods {
  private _boxClientLocal: any;

  constructor(boxClient: any) {
    this._boxClientLocal = boxClient;
  } //end constructor

  public get = (req: Request, res: Response) => {

    this._boxClientLocal.search
      .query(req.query.name, {
        // fields: "name,shared_link,permissions,collections,sync_state",
        type: req.query.type,
        ancestor_folder_ids: req.query.ancestor_folder_id
      })
      .then((results: any) => {
        return res.json(results);
      })
      .catch((err: any) => {
        return res.json(err);
      });
  }; //end get
} //end class SearchMethods


// export default function (boxClient: any): Router {
//   const router: Router = Router();

//   const searchMethods = new SearchMethods(boxClient);
//   router.get("/:type/:name/:ancestorFolderId", searchMethods.get);
//   return router;
// };;