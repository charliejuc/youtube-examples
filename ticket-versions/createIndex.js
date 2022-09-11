const mongo = require('mongodb');

const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const mongoConnectionString = `mongodb://root:${MONGO_PASSWORD}@localhost:27017/?authSource=admin&readPreference=primary&ssl=false`;
const mongoClient = new mongo.MongoClient(mongoConnectionString);
const db = mongoClient.db('tests');

const ordersCollection = db.collection('orders');

(async () => {
  await ordersCollection.createIndexes([
    {
      key: {
        version: 1,
      },
      unique: true,
    },
  ]);

  await mongoClient.close();
})();
