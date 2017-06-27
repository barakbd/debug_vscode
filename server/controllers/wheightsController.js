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
        console.log()
        if (!req.body || !req.body.wheight) {
            return res.json("can't add empty wheight")
        } else if (typeof req.body.wheight === "string") {
            return res.json("wheight must be a number")
        } else if (/^\d+$/.test(req.params.username))
        //test if username is only numbers
        {
            return res.json("username must be a string")
        }
        console.log("wheightsController.Create - req.body - " + util.inspect(req.body, utilOptions));
        console.log("wheightsController.Create - req.params - " + util.inspect(req.params, utilOptions));
        userDB
            .get(req.params.username)
            .then((user) => {
                console.log("wheightsController.create - user exists - let's add new wheight for user " + util.inspect(user, utilOptions))
                let createdAt = new Date();
                let newWheight = new WheightClass(req.body.wheight, createdAt);
                wheightDB
                    .set(user.username, newWheight)
                    .then((wheigtsRecorded) => {

                        res.json(wheigtsRecorded)
                    })
            })
            .catch((error) => {
                console.log("wheightsController.create - catch - user does not exists")
                res.json(error)
            })
    }, //end create

    get: function (req, res) {
        console.log("wheightsController.get - req.params - " + util.inspect(req.params, utilOptions));
        console.log("wheightsController.get - req.query - " + util.inspect(req.query, utilOptions));
        console.log(Object.keys(req.query).length)
        //Return error early in case query string is wrong
        if (Object.keys(req.query).length > 0 && (!req.query.options || req.query.options !== "average")) {
            res.json({error: "please check your query options"})
        }
        //Continue to get data
        userDB
            .get(req.params.username)
            .then(user => {
                wheightDB
                    .get(user.username)
                    .then(userRecordedWheights => {
                        console.log(userRecordedWheights)
                        if (Object.keys(req.query).length === 0 || !req.query.options) {
                            console.log("------ Return plain wheighth data")
                            res.json(userRecordedWheights)
                        } else if (req.query.options === "average") {
                            console.log("WOOHOO -------------------------- asking for average")
                            let calculateRecordsAverage = new Promise((resolve) => {
                                console.log("userRecordedWheights.userRecordedWheights " + util.inspect(userRecordedWheights.userRecordedWheights, utilOptions))
                                let totalWheights = userRecordedWheights
                                    .userRecordedWheights
                                    .reduce((first, second) => {
                                        console.log("first " + first + " second " + second)
                                        return first + second.wheight
                                    }, 0)
                                console.log(" ------------------ totalWheights - " + totalWheights)
                                let recordsAverage = totalWheights / userRecordedWheights.userRecordedWheights.length
                                console.log("------------- avergae - " + recordsAverage)
                                resolve(recordsAverage)
                            })
                            calculateRecordsAverage.then(recordsAverage => {
                                res.json({recordsAverage: recordsAverage})
                            })
                        }
                    })
            })
            .catch(error => {
                res.json(error)
            })
    }, //end get

    getAverageForUser: function (req, res) {
        console.log("wheightsController.get - req.params - " + util.inspect(req.params, utilOptions));
        userDB
            .get(req.params.username)
            .then(user => {
                wheightDB
                    .get(user.username)
                    .then(userRecordedWheights => {
                        let calculateRecordsAverage = new Promise((resolve) => {
                            let totalWheights = userRecordedWheights
                                .userRecordedWheights
                                .reduce((first, second) => {
                                    return first.wheight + second.wheight
                                })
                            let recordsAverage = totalWheights / userRecordedWheights.userRecordedWheights.length
                            console.log("------------- avergae - " + recordsAverage)
                            resolve(recordsAverage)
                        })
                        calculateRecordsAverage.then(recordsAverage => {
                            res.json({recordsAverage: recordsAverage})
                        })
                    })
            })
            .catch(error => {
                res.json(error)
            })

    }, //end getAverageForUser

} // end module.exports