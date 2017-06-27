const userDB = require("../models/UserDB");
const UserClass = require("../models/UserClass");
const util = require('util')
const utilOptions = {
    showHidden: false,
    depth: 2
}
console.log(util.inspect(userDB, utilOptions))

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
        console.log("usersController.Create - req.body - " + util.inspect(req.body, utilOptions));
        userDB
            .get(req.body.username)
            .then(() => {
                console.log("usersController.create - user exists - ")
                res.json("User exists - can't add user")
            })
            .catch(() => {
                console.log("usersController.create - user does not exists - catch - ")
                let newUser = {
                    username: req.body.username,
                    createdAt: new Date()
                }
                userDB
                    .set(newUser)
                    .then(function (newUser) {
                        res.json("new user added" + JSON.stringify(newUser))
                    })
            })
    }, //end create

    get: function (req, res) {
        console.log("usersController.get - req.params - " + util.inspect(req.params, utilOptions));
        userDB
            .get(req.params.username)
            .then((user) => {
                console.log("usersController.get - user exists - ")
                res.json("User found" + JSON.stringify(user))
            })
            .catch(() => {
                console.log("usersController.get - catch - user not found")
                res.json("User not found")

            })
    }, //end get

} // end module.exports