const wheightDB = require("../models/WheightDB");
const WheightClass = require("../models/WheightClass");
const util = require('util')
const utilOptions = {
    showHidden: false,
    depth: 2
}
console.log(util.inspect(wheightDB, utilOptions))

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
        console.log("wheightsController.Create - req.body - " + util.inspect(req.body, utilOptions));
        wheightDB
            .get(req.body.wheightname)
            .then(() => {
                console.log("wheightsController.create - wheight exists - ")
                res.json("Wheight exists - can't add wheight")
            })
            .catch(() => {
                console.log("wheightsController.create - wheight does not exists - catch - ")
                let newWheight = {
                    wheightname: req.body.wheightname,
                    createdAt: new Date()
                }
                wheightDB
                    .set(newWheight)
                    .then(function (newWheight) {
                        res.json("new wheight added" + JSON.stringify(newWheight))
                    })
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