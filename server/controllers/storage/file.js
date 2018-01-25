'use strict';

module.exports = function(boxServiceAccountClient){

    const filerMethods = {
        create: function(req, res) {
            if (!req.body || !req.body.fileName) {
                return res.json("can't add empty fileName")
            } else if (typeof req.body.username !== "string") {
                return res.json({
                    status: 400,
                    message: "fileName must be a string"
                })
            }
        
            boxServiceAccountClient.files.create(0, "test", fileInfo => {
                return res.json({
                    status: 400,
                    data: fileInfo
                })
            }).catch(err => {
                return res(err)
            });
        }, //end create
        
        get: function (req, res, boxServiceAccountClient) {
            boxServiceAccountClient.files.get(req.params.id, {
                fields: 'name,shared_link,permissions,collections,sync_state'
            }).then(fileInfo => {
                return res.json({
                    status: 200,
                    data: fileInfo
                })
            }).catch(err => {
                return res(err)
            })
        } //end get
        
    };//end fileMethods

    const express = require('express'),
    router = express.Router()

    router.post("/file", filerMethods.create)
    router.get("/file", filerMethods.get)
    return router;
    
};//end module.exports