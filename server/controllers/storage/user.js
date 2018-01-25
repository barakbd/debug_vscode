'use strict';

module.exports = function(boxServiceAccountClient){

    const folderMethods = {
        create: function(req, res) {
            if (!req.body || !req.body.folderName) {
                return res.json("can't add empty folderName")
            } else if (typeof req.body.username !== "string") {
                return res.json({
                    status: 400,
                    message: "folderName must be a string"
                })
            }
        
            boxServiceAccountClient.folders.create(0, "test", folderInfo => {
                return res.json({
                    status: 400,
                    data: folderInfo
                })
            }).catch(err => {
                return res(err)
            });
        }, //end create
        
        get: function (req, res, boxServiceAccountClient) {
            boxServiceAccountClient.folders.get(req.params.id, {
                fields: 'name,shared_link,permissions,collections,sync_state'
            }).then(folderInfo => {
                return res.json({
                    status: 200,
                    data: folderInfo
                })
            }).catch(err => {
                return res(err)
            })
        } //end get
        
    };//end folderMethods

    const express = require('express'),
    router = express.Router()

    router.post("/user", folderMethods.create)
    router.get("/user", folderMethods.get)
    return router;
    
};//end module.exports