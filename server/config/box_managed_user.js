'use strict';
// Require the Box SDK and the fs module
const boxSDK = require('box-node-sdk');
const fs = require('fs');

/*
// Read and parse the automatically created Box configuration file using require
const path = require('path');
let configFile = require(path.resolve(__dirname + '/../../box_config.json'));
*/
// Read and parse the automatically created Box configuration file.
let configFile = fs.readFileSync('box_config_managed_user.json');
configFile = JSON.parse(configFile);

// Initialize the SDK with the Box configuration file and create a client that uses the Service Account.
let boxManagedUser = boxSDK.getPreconfiguredInstance(configFile);
// const serviceAccountClient = session.getAppAuthClient('enterprise')

module.exports = boxManagedUser;