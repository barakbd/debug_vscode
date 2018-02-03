"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const dotenv_1 = require("dotenv");
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.load();
}
const port = process.env.PORT || 3000;
App_1.default.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
    return console.log(`server is listening on ${port}`);
});
