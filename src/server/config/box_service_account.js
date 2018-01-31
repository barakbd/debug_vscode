'use strict';
// Require the Box SDK and the fs module
const box = require('box-node-sdk');
const fs = require('fs');

/*
// Read and parse the automatically created Box configuration file using require
const path = require('path');
let configFile = require(path.resolve(__dirname + '/../../box_config.json'));
*/
// Read and parse the automatically created Box configuration file.
let configFile = fs.readFileSync('box_config_service_account.json');
configFile = JSON.parse(configFile);

// Initialize the SDK with the Box configuration file and create a client that uses the Service Account.
let session = box.getPreconfiguredInstance(configFile);
const serviceAccountClient = session.getAppAuthClient('enterprise')

/* Use the users.get method to retrieve current user's information by passing 'me' as the ID.
Since this client uses the Service Account, this will return the Service Account's information. */

serviceAccountClient.users.get('me', null)
    .then((serviceAccountUser) => {
        // Log the Service Account's login value which should contain "AutomationUser". 
        // For example, AutomationUser_375517_dxVhfxwzLL@boxdevedition.com
        console.log("Service Account - ", serviceAccountUser)
    })
    .catch((err) => {
        // Log any errors for debugging 
        console.error(err);
    });

module.exports = serviceAccountClient;