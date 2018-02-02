/************  SERVICE ACCOUNT METHODS *********************
https://stackoverflow.com/questions/45023624/how-to-require-multiple-controllers-with-express
https://www.terlici.com/2014/09/29/express-router.html
 */

 const express = require('express'),
  router = express.Router()

const fs = require('fs'), path = require("path");
const boxServiceAccountClient = require("./box_service_account");

 const boxControllers = fs.readdirSync(path.join(__dirname, "../controllers/box"))
  .filter(f => f !== 'index.js')

// var storageControllers={};
boxControllers.forEach(controller => {
    // const path = `../controllers/storage/${controller}`
    router.use('/box/serviceAccount', require(`../controllers/box/${controller}`)(boxServiceAccountClient))
});

module.exports = router