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
        
        get: function (req, res) {
            boxServiceAccountClient.folders.get(/* "45416054928" */req.params.id, {
                fields: 'name,shared_link,permissions,collections,sync_state'
            }).then(folderInfo => {
                return res.json({
                    status: 200,
                    data: folderInfo
                })
            }).catch(err => {
                return res.json(err)
            })
        }, //end get

        search: function (req, res) {
            boxServiceAccountClient.search.query(req.params.string, 
                {
                    fields: 'name,modified_at,size,extension,permissions,sync_state, collections',
                    type: 'folder',
                    limit: 5,
                    offset: 0
                }
            ).then(folderInfo => {
                return res.json({
                    status: 200,
                    data: folderInfo
                })
            }).catch(err => {
                return res.json(err)
            })
        } //end search

        
    };//end folderMethods

    const express = require('express'),
    router = express.Router()

    router.post("/folder/:id", folderMethods.create)
    router.get("/folder/:id", folderMethods.get)
    router.get("/folder/search/:string", folderMethods.search)

    return router;
    
};//end module.exports