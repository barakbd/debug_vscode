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
        }, //end get

        search: function (req, res) {
            boxServiceAccountClient.search.query( req.params.file_name, 
                {
                    // fields: 'name,modified_at,size,extension,permissions,sync_state, collections',
                    type: 'file',
                    scope: "user_content",
                    // ancestor_folder_ids: req.params.folder_id,
                    limit: 5,
                    offset: 0,
                    // file_extensions: "pptx"
                }
            ).then(files => {
                return res.json({
                    status: 200,
                    data: files
                })
            }).catch(err => {
                return res.json(err)
            })
        } //end search

        
    };//end fileMethods

    const express = require('express'),
    router = express.Router()

    router.post("/file", filerMethods.create)
    router.get("/file", filerMethods.get)
    router.get("/file/search/:folder_id/:file_name", filerMethods.search)

    return router;
    

    
};//end module.exports