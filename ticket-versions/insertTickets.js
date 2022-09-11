const mongo = require('mongodb');

const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const mongoConnectionString = `mongodb://root:${MONGO_PASSWORD}@localhost:27017/?authSource=admin&readPreference=primary&ssl=false`;
const mongoClient = new mongo.MongoClient(mongoConnectionString);
const db = mongoClient.db('tests');

const ticketsCollection = db.collection('tickets');

const tickets = [
  {
    _id: 1,
    name: 'Metallica Concert - Fear of the Dark',
    totalTickets: 5,
    available: 2,
    sold: 3,
  },
];

(async () => {
  await ticketsCollection.insertMany(tickets);

  console.log(await ticketsCollection.find({}).toArray());

  await mongoClient.close();
})();
