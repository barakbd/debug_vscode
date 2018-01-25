//create express app
const express = require('express');
const app = express();

/* DotEnv - Simulate Environment variables
require dotenv for reading variables from local .env file
if statement checks that we are not running on prod environment -
in which case we'd read the actual evn using process.env.<VARIABLE_NAME>
 */
if (process.env.NODE_ENV !== 'production') { 
    require('dotenv').load();
}
//Server is only sending jsons so we only need body-parser json method
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//require routes and store in variable in order to call and pass in express app
/* require('./server/config/routes.js')(app);
const routes = require('./server/config/routes.js');
routes(app);
 */
app.use(require('./server/config/routes'))

const port = process.env.PORT || 3000;
//Start server
app.listen(port, function () {
    console.log(`listening on port ${port}`);
});
module.exports = app