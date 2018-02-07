'use strict';

module.exports = function(client){

    const folderMethods = {
        create: function(req, res) {
            if (!req.body || !req.body.folder_name) {
                return res.json("can't add empty folderName")
            } else if (typeof req.body.folder_name !== "string") {
                return res.json({
                    status: 400,
                    message: "folderName must be a string"
                })
            }
        
            client.folders.create(0, req.body.folder_name).then(folderInfo => {
                return res.json({
                    status: 400,
                    data: folderInfo
                })
            }).catch(err => {
                return res.json(err)
            });
        }, //end create
        
        get: function (req, res) {
            client.folders.get(/* "45416054928" */req.params.id, {
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
        
        getItems: function (req, res) {
            client.folders.getItems(/* "45416054928" */req.params.id, {
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
            client.search.query(req.params.folder_name, 
                {
                    fields: 'name,modified_at,size,extension,permissions,sync_state, collections',
                    type: 'folder',
                    ancestor_folder_ids: 0,
                    limit: 5,
                    offset: 0,
                }
            ).then(folders => {
                return res.json({
                    status: 200,
                    data: folders
                })
            }).catch(err => {
                return res.json(err)
            })
        } //end search

        
    };//end folderMethods

    const express = require('express'),
    router = express.Router()

    router.post("/folders", folderMethods.create)
    router.get("/folders/:id", folderMethods.get)
    router.get("/folders/:id/items", folderMethods.getItems)
    router.get("/folders/search/:folder_name", folderMethods.search)

    return router;
    
};//end module.exports