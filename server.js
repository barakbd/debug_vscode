var tracer = require('tracer').colorConsole();

//create express app
const express = require('express');
const app = express();

//Server is only sending jsons so we only need body-parser json method
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//require routes and store in variable in order to call and pass in express app
const routes = require('./server/config/routes.js');
routes(app);

//Start server
app.listen(8000, function(){
    console.log('listening on port 8000');
});
