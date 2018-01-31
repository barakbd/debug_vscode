const boxManagedUserSDK = require("./box_managed_user");

const express = require('express'),
  router = express.Router()
router.use('/box/linkCardFolder/:folderName', require(`../controllers/box/link_card_folder`)(boxManagedUserSDK))



/************  SERVICE ACCOUNT METHODS *********************
https://stackoverflow.com/questions/45023624/how-to-require-multiple-controllers-with-express
https://www.terlici.com/2014/09/29/express-router.html
 */

const fs = require('fs'), path = require("path");
const boxServiceAccountClient = require("./box_service_account");

 const boxControllers = fs.readdirSync(path.join(__dirname, "../controllers/box"))
  .filter(f => f !== 'link_card_folder.js')

// var storageControllers={};
boxControllers.forEach(controller => {
    // const path = `../controllers/storage/${controller}`
    router.use('/box/serviceAccount', require(`../controllers/box/${controller}`)(boxServiceAccountClient))
});


module.exports = router