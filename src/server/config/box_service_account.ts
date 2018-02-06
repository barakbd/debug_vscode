'use strict';
// Require the Box SDK and the fs module
const box = require ('box-node-sdk');
import * as fs from "fs";
// const fs = require('fs');;

/*
// Read and parse the automatically created Box configuration file using require
const path = require('path');
let configFile = require(path.resolve(__dirname + '/../../box_config.json'));
*/
// Read and parse the automatically created Box configuration file.
let configFile: string[]  = fs.readdirSync("box_config_service_account.json")
configFile = JSON.parse(configFile[0]);

// Initialize the SDK with the Box configuration file and create a client that uses the Service Account.
let session = box.getPreconfiguredInstance(configFile);
const boxServiceAccountClient = session.getAppAuthClient('enterprise')

/* Use the users.get method to retrieve current user's information by passing 'me' as the ID.
Since this client uses the Service Account, this will return the Service Account's information. */

boxServiceAccountClient.users.get('me', null)
    .then((serviceAccountUser: any) => {
        // Log the Service Account's login value which should contain "AutomationUser". 
        // For example, AutomationUser_375517_dxVhfxwzLL@boxdevedition.com
        console.log("Service Account - ", serviceAccountUser)
    })
    .catch((err: any) => {
        // Log any errors for debugging 
        console.error(err);
    });

export {boxServiceAccountClient};