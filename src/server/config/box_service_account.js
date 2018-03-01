"use strict";
exports.__esModule = true;
// Require the Box SDK and the fs module
var BoxSDK = require("box-node-sdk");
// console.log("-------", process.env.NODE_ENV)
// import box from "box-node-sdk"; - throws ts error - implicit any
var boxSDK = new BoxSDK({
    clientID: process.env.BOX_CLIENT_ID,
    clientSecret: process.env.BOX_CLIENT_SECRET,
    appAuth: {
        keyID: process.env.BOX_PUBLIC_KEY_ID,
        privateKey: process.env.BOX_PRIVATE_KEY,
        passphrase: process.env.BOX_PASSPHRASE
    }
});
// Get the service account client, used to create and manage app user accounts
var boxServiceAccountClient = boxSDK.getAppAuthClient('enterprise', process.env.BOX_APP_ENTERPRISE_ID);
exports.boxServiceAccountClient = boxServiceAccountClient;
/* // Initialize the SDK with the Box configuration file and create a client that uses the Service Account.
import { readdirSync } from "fs";

const files: string[] = readdirSync("../../../box_config_service_account.json");
// const configFile: string = JSON.parse(files[0]);
const configFile: any = process.env.BOX_CONFIG;

const session = box.getPreconfiguredInstance(configFile);
const boxServiceAccountClient = session.getAppAuthClient("enterprise");
 */
/* Use the users.get method to retrieve current user's information by passing 'me' as the ID.
Since this client uses the Service Account, this will return the Service Account's information. */
boxServiceAccountClient.users
    .get("me", null)
    .then(function (serviceAccountUser) {
    // Log the Service Account's login value which should contain "AutomationUser".
    // For example, AutomationUser_375517_dxVhfxwzLL@boxdevedition.com
    // console.log("Service Account - ", serviceAccountUser);
})["catch"](function (err) {
    // Log any errors for debugging
    console.log(err);
});
