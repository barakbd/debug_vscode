const fs = require('fs'), path = require("path");

const boxServiceAccount = require("./box_service_account");

/* https://stackoverflow.com/questions/45023624/how-to-require-multiple-controllers-with-express
https://stackoverflow.com/questions/45023624/how-to-require-multiple-controllers-with-express
https://www.terlici.com/2014/09/29/express-router.html
 */
const express = require('express')
  , router = express.Router()

 const storageControllers = fs.readdirSync(path.join(__dirname, "../controllers/storage"))
  .filter(f => f !== 'index.js')

// var storageControllers={};
storageControllers.forEach(controller => {
    // const path = `../controllers/storage/${controller}`
    router.use('/storage', require(`../controllers/storage/${controller}`)(boxServiceAccount))
});
module.exports = router