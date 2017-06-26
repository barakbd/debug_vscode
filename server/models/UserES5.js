var User = function (id, name, createdAt) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
}
User.prototype.userArray = [
    {
        "id": "1",
        "name": "John",
        "createdAt": "2017-12-12"
    }
];
User.prototype.userNameExistsInContructorArray = function () {
    console.log("this.userExistsInContructorArray")
    return (getIndexIfObjWithOwnAttr(this.userArray, "name", this));
}

User.prototype.addUserToConstructorArray = function () {
    console.log("this.addUserToConstructorArray")
    console.log("return from search - ", this.userNameExistsInContructorArray())

    if (this.userNameExistsInContructorArray() > -1)
    {
        console.log("can't add user")
        return ("user exists")
    } else
    {
        this
            .userArray
            .push(newUser)
        console.log("pushed!", this.userArray)
    }
}

User.prototype.userNameExistsInContructorArrayPromise = function () {
    return new Promise(function (resolve, reject) {
        console.log("this.userNameExistsInContructorArrayPromise")
        if (getIndexIfObjWithOwnAttr(this.userArray, "name", this) === -1)
        {
            resolve("user does not exist")
        } else
        {
            reject("user exists")

        }
    })
}

function getIndexIfObjWithOwnAttr(array, attr, value) {
    for (var i = 0; i < array.length; i++)
    {
        if (array[i].hasOwnProperty(attr) && array[i][attr].toLowerCase() === value[attr].toLowerCase())
        {
            // console.log("found index - ", i)
            return i;
        }
    }
    // console.log("index does not exist")
    return -1;
}

User.prototype.userNameExistsInContructorArrayPromise = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
        console.log("this.userNameExistsInContructorArrayPromise" + this)
        if (getIndexIfObjWithOwnAttr(this.userArray, "name", this) === -1)
        {
            console.log(getIndexIfObjWithOwnAttr(this.userArray, "name", this))
            resolve("user does not exist")
        } else
        {
            reject("user exists")

        }
    })
}

User.prototype.addUserToConstructorArrayAfterPromise = function () {
    console.log("this.addUserToConstructorArrayAfterPromise")
    this
        .userNameExistsInContructorArrayPromise()
        .then(function (userDoesNotExists) {
            console.log(userDoesNotExists)
            this
                .userArray
                .push(newUser)
            console.log("pushed!", this.userArray)

        })
        .catch(function (userExists) {
            console.log(userExists)
            console.log("addUserToConstructorArrayAfterPromise - user exists")
        })

}

var newUser = new User(1, "John", "2017-01-01")
console.log("original userArray - ", newUser.constructor.prototype.userArray)
console.log("newUser - ", newUser)

// newUser.userExistsInContructorArray() newUser.addUserToConstructorArray()
newUser.addUserToConstructorArrayAfterPromise();