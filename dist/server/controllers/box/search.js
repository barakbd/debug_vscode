"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
function default_1(boxClient) {
    const router = express_1.Router();
    const searchMethods = new SearchMethods(boxClient);
    router.get("/:type/:name", searchMethods.search);
    return router;
}
exports.default = default_1;
class SearchMethods {
    constructor(boxClient) {
        this.search = (req, res) => {
            return this._boxClientLocal.search
                .query(req.params.name, {
                fields: "name,modified_at,size,extension,permissions,sync_state, collections",
                type: req.params.type,
                ancestor_search_ids: 0,
                limit: 5,
                offset: 0
            })
                .then((searchs) => {
                return res.json({
                    status: 200,
                    data: searchs
                });
            })
                .catch((err) => {
                return res.json(err);
            });
        };
        this._boxClientLocal = boxClient;
    }
}
exports.SearchMethods = SearchMethods;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZlci9jb250cm9sbGVycy9ib3gvc2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBTWlCO0FBRWpCLG1CQUF5QixTQUFjO0lBQ3JDLE1BQU0sTUFBTSxHQUFXLGdCQUFNLEVBQUUsQ0FBQztJQUVoQyxNQUFNLGFBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNuRCxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakQsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBTkQsNEJBTUM7QUFFRDtJQUdFLFlBQVksU0FBYztRQUluQixXQUFNLEdBQUcsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFvQixFQUFFO1lBQ2hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU07aUJBQy9CLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDdEIsTUFBTSxFQUNKLHFFQUFxRTtnQkFDdkUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSTtnQkFDckIsbUJBQW1CLEVBQUUsQ0FBQztnQkFDdEIsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLENBQUM7YUFDVixDQUFDO2lCQUNELElBQUksQ0FBQyxDQUFDLE9BQWMsRUFBRSxFQUFFO2dCQUN2QixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDZCxNQUFNLEVBQUUsR0FBRztvQkFDWCxJQUFJLEVBQUUsT0FBTztpQkFDZCxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7Z0JBQ2xCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBO1FBdEJDLElBQUksQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO0lBQ25DLENBQUM7Q0FzQkY7QUEzQkQsc0NBMkJDIn0=