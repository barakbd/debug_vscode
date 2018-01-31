'use strict';

module.exports = function (managedUserSDK) {
    return function (req, res) {
        managedUserSDK.getTokensAuthorizationCodeGrant(req.query.code, null).then(AccessToken => {
            //create a client using the AccessToken
            const boxManagedUserClient = managedUserSDK.getBasicClient(AccessToken.accessToken);

            //Get the folder ID from req query
            boxManagedUserClient.search.query(req.params.folderName
                /* {
                                fields: 'name,modified_at,size,extension,permissions,sync_state, collections',
                                type: "folder",
                                limit: 2,
                                offset: 0,
                            } */
            ).then(foldersArray => {
                if (foldersArray.length === 0) {
                    // res.status(404)
                    res.set('Content-Type', 'application/json');
                    res.json({
                        error: "Item not found"
                    })
                } else if (foldersArray.length > 1) {
                    // res.status(300)
                    // res.set('Content-Type', 'application/json');
                    res.send(foldersArray)
                } else {
                    boxManagedUserClient.collaborations.createWithUserID(
                        '3192996959',
                        foldersArray.entries[0].id,
                        boxManagedUserClient.collaborationRoles.EDITOR, {
                            type: boxManagedUserClient.itemTypes.FOLDER
                        }).then(collaborationID => {
                        res.json(collaborationID)
                    }).catch(searchError => {
                        // res.set('Content-Type', 'application/json');
                        res.send(searchError)
                    })
                }
            }).catch(boxManagedUserClientError => {
                res.send(boxManagedUserClientError)
            }) // end returned foldersArray
        }) //end getTokensAuthorizationCodeGrant
    }
}; //end module.exports