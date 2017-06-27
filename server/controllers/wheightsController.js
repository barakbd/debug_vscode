const userDB = require("../models/UserDB");

const wheightDB = require("../models/WheightDB");
const WheightClass = require("../models/WheightClass");

const util = require('util')
const utilOptions = {
    showHidden: false,
    depth: 2
}

console.log(util.inspect("wheightsController - wheightDB - " + wheightDB, utilOptions))
console.log(util.inspect("wheightsController - userDB - " + userDB, utilOptions))

module.exports = {
    create: function (req, res) {
        if (!req.body || !req.body.wheight)
        {
            return res.json("can't add empty wheight")
        } else if (typeof req.body.wheight === "string")
        {
            return res.json("wheight must be a number")
        }
        console.log("wheightsController.Create - req.body - " + util.inspect(req.body, utilOptions));
        console.log("wheightsController.Create - req.params - " + util.inspect(req.params, utilOptions));
        userDB.get(req.params.username).then((username) => {
            console.log("wheightsController.create - user exists - let's add new wheight")
            let createdAt = new Date();
            let newheight = new WheightClass(req.body.wheight, createdAt);
            wheightDB.set(username, newheight).then(() => {

                res.json(usersWheights)
            })
        }).catch(() => {
            console.log("wheightsController.create - catch - user does not exists")
            res.json("user does not exists - can't add wheight")
        })
    }, //end create

    get: function (req, res) {
        console.log("wheightsController.get - req.params - " + util.inspect(req.params, utilOptions));
        wheightDB
            .get(req.params.wheightname)
            .then((wheight) => {
                console.log("wheightsController.get - wheight exists - ")
                res.json("Wheight found" + JSON.stringify(wheight))
            })
            .catch(() => {
                console.log("wheightsController.get - catch - wheight not found")
                res.json("Wheight not found")

            })
    }, //end get

} // end module.exports