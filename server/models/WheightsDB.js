// https://www.sitepoint.com/javascript-design-patterns-singleton/

class Wheight {
  constructor() {
    if (!Wheight.WheightDB) {
      this._data = [];
      Wheight.WheightDB = this;
    }

    return Wheight.WheightDB;
  }

  add(wheightRecord) {
    this
      ._data
      .push(wheightRecord);
  }

  get(userId) {
    return this
      ._data
      .find(wheightRecord => wheightRecord.userId === userId);
  }

}

const WheightDB = new Wheight();
Object.freeze(WheightDB);

export default WheightDB;