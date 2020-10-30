const { MongoClient, ObjectId} = require("mongodb")

class DataStore {
  constructor(dbUrl, dbName, dbCollection) {
    this.dbUrl = dbUrl;
    this.dbName = dbName;
    this.dbCollection = dbCollection;
    this.dbClient = null;
  }

  async client() {
    if (this.dbClient && this.dbClient.isConnected()) {
      return this.dbClient
    } else {
      console.log(`Connecting to ${this.dbUrl}`)
      this.dbClient = await MongoClient.connect(this.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log("Connected to database!!");
      return this.dbClient;
    }
  }

  async collection() {
    const client = await this.client()
    const database = client.db(this.dbName)
    const collection = database.collection(this.dbCollection)
    return collection;
  }

  async insert(object) {
    let response = { status: null, error: null }
    try {
      let collection = await this.collection();
      console.log("Inserting item...")
      await collection.insertOne(object);
      // console.log(result.ops[0]);
      console.log("Item successfully added");
      response.status = "ok"
    } catch (error) {
      response.error = error.toString();
      console.log(error.toString());
    }
    return response;
  }

  async getAll() {
    let response = { status: null, error: null, data: null }
    let items = []
    try {
      let collection = await this.collection();
      await collection.find({}).forEach((item) => items.push(item));
      response.status = "ok"
      response.data = items;
    } catch (error) {
      response.error = error.toString();
      console.log(error.toString());
    }
    return response
  }

  async getOne(id) {
    let response = { status: null, error: null, data: null };
    try {
      let collection = await this.collection();
      let item = await collection.findOne({ _id: ObjectId(id)});
      response.status = "ok";
      response.data = item;
    } catch (error) {
      response.error = error.toString();
      console.log(error.toString());
    }
    return response
  }

  async update(id, updateObject) {
    let response = { status: null, error: null };
    try {
      let collection = await this.collection();
      await collection.updateOne({ _id: ObjectId(id)}, { $set: updateObject });
      console.log("Update Successful!");
      response.status = "ok";
    } catch (error) {
      response.error = error.toString();
      console.log(error.toString());
    }
    return response
  }

  async delete(id) {
    let response = { status: null, error: null };
    try {
      let collection = await this.collection();
      await collection.deleteOne({ _id: ObjectId(id)});
      console.log("Item Deleted!");
      response.status = "ok";
    } catch (error) {
      response.error = error.toString();
      console.log(error.toString());
    }
    return response
  }
}

module.exports = DataStore;