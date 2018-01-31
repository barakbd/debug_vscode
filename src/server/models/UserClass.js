// https://www.sitepoint.com/javascript-design-patterns-singleton/

class UserClass {
  constructor(username, createdAt) {
    this.username = username;
    this.createdAt = createdAt;
  }
}
module.exports = UserClass