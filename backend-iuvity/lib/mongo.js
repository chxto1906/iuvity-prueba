const { ObjectId } = require("mongodb");

class MongoLib {
  constructor() {
    this.db = app.locals.db;
  }
  get(collection, id=null, fields={}) {
    return this.db.collection(collection).findOne({ _id: ObjectId(id)});
  }
  find(collection, query={}) {
    return this.db.collection(collection).find(query).toArray();
  }
  create(collection, data) {
    return this.db.collection(collection).insertOne(data);
  }
  updateOne(collection, id, data) {
    return this.db
      .collection(collection)
      .updateOne({ _id: ObjectId(id) }, { $set: data });
  }
  deleteOne(collection, id) {
    return this.db.collection(collection).deleteOne({ _id: ObjectId(id) }); //elimina físicamente
  }
  deleteMany(collection, query) {
    return this.db.collection(collection).deleteMany(query); //elimina físicamente
  }
}

module.exports = MongoLib;