const mongo = require('mongodb');

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
    version: '1$0$5
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
  const updatedSold = totalTickets - updatedAvailable;
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

  const version = `${ticketId}$${updatedAvailable}$${updatedSold}`;

  const orderDocument = {
    units,
    from,
    fromId: ticketId,
    version,
  };

  await ordersCollection.insertOne(orderDocument);

  const ticketFieldsToUpdate = {
    available: updatedAvailable,
    sold: updatedSold,
  };
  await ticketsCollection.updateOne(
    {
      _id: ticketId,
    },
    {
      $set: ticketFieldsToUpdate,
    }
  );

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

  const results = await Promise.allSettled(orders.map(buyTicket));

  console.log(results.map((result) => (result.status === 'fulfilled' ? result.value : result.reason)));

  await mongoClient.close();
})();
