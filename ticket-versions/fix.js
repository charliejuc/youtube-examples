const mongo = require('mongodb');

const generateOneTimeNumber = (seconds) => {
  const dateInSeconds = Date.now() / 1000;

  return Math.floor(dateInSeconds / seconds);
};

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
    version: '56430246$1$0$5
  },
];
\ Order model */

const maxBuyTicketRetries = 3;
const buyTicket = async ({ units, fromId: ticketId }, _retries) => {
  const seconds = 30;
  const oneTimeNumber = generateOneTimeNumber(seconds);

  const retries = Number.isInteger(_retries) ? _retries : 0;

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

  const version = `${oneTimeNumber}$${ticketId}$${updatedAvailable}$${updatedSold}`;

  const orderDocument = {
    units,
    from,
    fromId: ticketId,
    version,
  };

  try {
    await ordersCollection.insertOne(orderDocument);
  } catch (err) {
    const DUPLICATED_KEY_ERROR_CODE = 11000;
    if (err.code === DUPLICATED_KEY_ERROR_CODE) {
      if (retries >= maxBuyTicketRetries) {
        return {
          ...result,
          product: 'ticketBuyRetriesExceeded',
        };
      }

      console.log('Retrying...', { units, fromId: ticketId });
      return buyTicket({ units, fromId: ticketId }, retries + 1);
    }

    throw err;
  }

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
