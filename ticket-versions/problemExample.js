const mongo = require('mongodb');

const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const mongoConnectionString = `mongodb://root:${MONGO_PASSWORD}@localhost:27017/?authSource=admin&readPreference=primary&ssl=false`;
const mongoClient = new mongo.MongoClient(mongoConnectionString);
const db = mongoClient.db('tests');

const ordersCollection = db.collection('orders');

/* Order model
[
  {
    units: 2,
    from: 'tickets',
    fromId: 1,
  },
];
\ Order model */

const buyTicket = async ({ units, fromId: ticketId }) => {
  const result = {
    errorsKeys: null,
    orderDocument: null,
  };

  const from = 'tickets';
  const ticketsCollection = db.collection(from);
  const ticketDocument = await ticketsCollection.findOne({
    _id: ticketId,
  });

  if (ticketDocument == null) {
    return {
      ...result,
      errorsKeys: {
        product: 'ticketDoesNotExist',
      },
    };
  }

  const { available, totalTickets, sold } = ticketDocument;
  const realAvailable = totalTickets - sold;
  const updatedAvailable = realAvailable - units;
  const hasAvailableTickets = available === realAvailable && realAvailable > 0;
  const hasEnoughTickets = hasAvailableTickets && updatedAvailable >= 0;

  if (!hasEnoughTickets) {
    return {
      ...result,
      errorsKeys: {
        product: 'ticketNoEnough',
      },
    };
  }

  const orderDocument = {
    units,
    from,
    fromId: ticketId,
  };

  const ticketFieldsToUpdate = {
    available: updatedAvailable,
    sold: totalTickets - updatedAvailable,
  };
  await ticketsCollection.updateOne(
    {
      _id: ticketId,
    },
    {
      $set: ticketFieldsToUpdate,
    }
  );

  await ordersCollection.insertOne(orderDocument);

  const updatedTicketDocument = {
    ...ticketDocument,
    ...ticketFieldsToUpdate,
  };

  return {
    ...result,
    orderDocument,
    ticketDocument: updatedTicketDocument,
  };
};

(async () => {
  const orders = [
    {
      units: 1,
      fromId: 1,
    },
    {
      units: 1,
      fromId: 1,
    },
  ];

  console.log('Order 1', await buyTicket(orders[0]));
  await sleep(4000);
  console.log('Order 2', await buyTicket(orders[1]));

  // const results = await Promise.allSettled(orders.map(buyTicket));

  // console.log(results.map((result) => result.value));

  await mongoClient.close();
})();
