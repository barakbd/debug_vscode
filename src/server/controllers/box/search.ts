import {
  Router,
  Request,
  Response,
  // NextFunction,
  // RequestHandler
} from "express";

export default function (boxClient: any) : Router{
  const router: Router = Router();

  const searchMethods = new SearchMethods(boxClient);
  router.get("/:type/:name", searchMethods.search);
  return router;
}

export class SearchMethods {
  private _boxClientLocal: any;

  constructor(boxClient: any) {
    this._boxClientLocal = boxClient;
  } //end constructor

  public search = (req: Request, res: Response):Promise<Response> =>{
    return this._boxClientLocal.search
      .query(req.params.name, {
        fields:
          "name,modified_at,size,extension,permissions,sync_state, collections",
        type: req.params.type,
        ancestor_search_ids: 0,
        limit: 5,
        offset: 0
      })
      .then((searchs: any[]) => {
        return res.json({
          status: 200,
          data: searchs
        });
      })
      .catch((err: any) => {
        return res.json(err);
      });
  } //end search
} //end class SearchMethods