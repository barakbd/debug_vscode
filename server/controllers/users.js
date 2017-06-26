const tracer = require('tracer').colorConsole();
// const User = require('../classes/User.js')
const fs = require('fs')
var userArray = [{ "name": "John" }]

function getIndexIfObjWithOwnAttr(array, attr, value) {
    return new Promise(function (resolve, reject) {
        var testBinding = "testBinding";
        setTimeout(function (testBinding) {
            console.log("testBinding - " + testBinding)
            for (var i = 0; i < array.length; i++)
            {
                if (array[i].hasOwnProperty(attr) && array[i][attr].toLowerCase() === value.toLowerCase())
                {
                    console.log("found index - ", i)
                    resolve(i);
                } else
                {
                    console.log("index does not exist")
                    reject(-1);
                }
            }
        }.bind(null, testBinding), 3000)

    })
}
var simulateAsyncCall = function (params, callback) {
    return new Promise(function (resolve, reject) {
        var testBinding = "testBinding";
        setTimeout(callback, 3000)
    })
}

var userExists = getIndexIfObjWithOwnAttr(userArray, "name", "John");
userExists
    .then(function (user) { console.log("promise resolved") })
    .catch(function (err) { console.log(err) })



var testObject = {
    "name": "sdfdsf",
    "fddsaf": "asdasd"
}
module.exports = {
    create: function (req, res) {
        tracer.info('users - create');
        console.log(req.body);
        //return if user exists in a promise
        const userExists = getIndexIfObjWithOwnAttr(userArray, "name", req.body.name)
        userExists
            .then(function (user) { console.log("promise resolved") })
            .catch(function (err) { console.log(err) })

        var createdAt = new Date();
        var newUser = new user({ name: req.body.name, createdAt: createdAt });
        customer.save({}, function (err) {
            if (err)
            {
                tracer.info('users - create - error');
                tracer.info(err);
                // var error = {error: err};
                res.json(err);
            } else
            {
                tracer.info('users - create - success');
                res.redirect('/users');
            }
        });
    }, //End create

    index: function (req, res) {
        tracer.info('users - index');
        Customer.find({}, function (err, users) {
            if (err)
            {
                tracer.info('users - index - error');
                tracer.info(err);
                var error = err.errors.name.message;
                res.json(error);
            } else
            {
                tracer.info('users - index - success');
                tracer.info(users);
                res.json(users);
            }
        });
    }, //End index

    findOne: function (req, res) {
        tracer.info('users - index');
        Customer.findOne({
            _id: req.params.id
        }, function (err, users) {
            if (err)
            {
                tracer.info('users - index - error');
                tracer.info(err);
                var error = err.errors.name.message;
                res.json(error);
            } else
            {
                tracer.info('users - index - success');
                tracer.info(users);
                res.json(users);
            }
        });
    }, //End index

    delete: function (req, res) {
        tracer.info('users - delete');
        tracer.info(req.params.id);
        Customer.remove({
            _id: req.params.id
        }, function (err) {
            if (err)
            {
                tracer.info('users - delete - error');
                tracer.info(err);
                res.json(err);
            } else
            {
                tracer.info('users - delete - success');
                // res.json({status: 'success'});
                res.redirect('/users');
            }
        });
    } //End delete

}; //End module.exports