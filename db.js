const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;
const dbName = 'cmm';
const connectionString = 'mongodb://localhost:27017';

const dao = async action => {  
  let client = await MongoClient.connect(connectionString, { useNewUrlParser: true });
  let db = client.db(dbName);
  try {
      return await action(db);
  }
  finally {
      client.close();
  }
}

const insertOne = (collection, obj) => dao(db => db.collection(collection).insertOne( obj ));

const insertUnique = (collection, index, obj) => dao(db => {
  function newIndex(index) { this[index] = 1 }
  db.collection(collection).createIndex( new newIndex(index), { unique: true } );
  return db.collection(collection).insertOne( obj );
})

const getAccountByUserID = userID => dao(db => db.collection("accounts").findOne({ userID: userID }));
const findAccountsByGroupID = id => dao(db => db.collection("accounts").find({$or: [{groupID: id}, {_id: new ObjectId(id)}]}).toArray());
const getAccountByID = id => dao(db => db.collection("accounts").findOne({ _id: new ObjectId(id) }));
const getAccountByToken = token => dao(db => db.collection("accounts").findOne({ accessToken: token }));

module.exports = {
  insertOne: insertOne,
  insertUnique: insertUnique,
  getAccountByUserID: getAccountByUserID,
  getAccountByID: getAccountByID,
  findAccountsByGroupID: findAccountsByGroupID,
  getAccountByToken: getAccountByToken
}