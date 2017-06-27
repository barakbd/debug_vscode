const userDB = require("../models/UserDB");
const UserClass = require("../models/UserClass");

const util = require('util')
const utilOptions = {
    showHidden: false,
    depth: 2
}

console.log(util.inspect("usersController - userDB - " + userDB, utilOptions))
/* function simulateAsyncCall(params, callback) {
    return new Promise(function (resolve, reject) {
        console.log("Promise returned")
        var testBinding = "testBinding";
        setTimeout(callback, 3000)
    })
}
 */
module.exports = {
    create: function (req, res) {
        if (!req.body || !req.body.username) {
            return res.json("can't add empty username")
        } else if (typeof req.body.username === "number") {
            return res.json("username must be a string")
        }
        console.log("usersController.Create - req.body - " + util.inspect(req.body, utilOptions));
        userDB
            .get(req.body.username)
            .then(() => {
                console.log("usersController.create - user exists - ")
                return res.json({error: "User exists, can't add user"})
            })
            .catch(() => {
                console.log("usersController.create - user does not exists - catch - ")
                let createdAt = new Date()
                let newUser = new UserClass(req.body.username, createdAt)
                console.log("newUser = " + util.inspect(newUser, utilOptions))
                userDB
                    .set(newUser)
                    .then(function (newUserAdded) {
                        return res.json(newUserAdded)
                    })
            })
    }, //end create

    get: function (req, res) {
        console.log("usersController.get - req.params - " + util.inspect(req.params, utilOptions));
        userDB
            .get(req.params.username)
            .then((user) => {
                console.log("usersController.get - user exists - ")
                return res.json({userFound: user})
            })
            .catch((error) => {
                console.log("usersController.get - catch - user not found")
                return res.json(error)

            })
    }, //end get

} // end module.exports