const mongo = require('mongodb');
const crypto = require('crypto');
const uuidV4 = require('uuid').v4;

const passwordSalt = 'saltToProtectAgainstRainbowTables';

const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const mongoConnectionString = `mongodb+srv://charlie:${MONGO_PASSWORD}@cluster0.ubozaxw.mongodb.net/test`;
const mongoClient = new mongo.MongoClient(mongoConnectionString);
const db = mongoClient.db('tests');

class UserMongoRepository {
  constructor() {
    this.collection = db.collection('users');
  }

  create({ id, username, password, email }) {
    this.collection.insertOne({
      _id: id,
      username,
      password,
      email,
    });
  }

  all() {
    return this.collection.find({}).toArray();
  }

  getById(id) {
    return this.collection.findOne({ _id: id });
  }
}

class UserInMemoryRepository {
  constructor() {
    this.db = {};
  }

  create({ id, username, password, email }) {
    this.db[id] = {
      id,
      username,
      password,
      email,
    };
  }

  all() {
    return Object.values(this.db).map((user) => ({
      ...user,
    }));
  }

  getById(id) {
    if (this.db[id] == null) {
      return null;
    }

    return {
      ...this.db[id],
    };
  }
}

const userSignUp =
  (userRepository) =>
  async ({ id, username, password, email }) => {
    const result = {
      errorsKeys: null,
      userDocument: null,
    };

    // TODO: data validation...

    const saltedPassword = `${passwordSalt}${password}`;
    const userDocument = {
      id,
      username,
      password: crypto.createHash('sha256').update(saltedPassword).digest().toString('hex'),
      email,
    };

    await userRepository.create(userDocument);

    return {
      ...result,
      userDocument,
    };
  };

const inMemoryRepository = new UserInMemoryRepository();
const mongoRepository = new UserMongoRepository();

(async () => {
  const userId = uuidV4().replace(/-/g, '');

  await mongoClient.connect();

  console.time('Cache');
  console.timeEnd('Cache');

  console.time('Mongo Atlas Database');
  console.log(
    await userSignUp(mongoRepository)({
      id: userId,
      username: 'Mike',
      password: 'Ultra secret',
      email: 'mike@example.com',
    })
  );
  console.timeEnd('Mongo Atlas Database');

  console.time('In Memory Database');
  console.log(
    await userSignUp(inMemoryRepository)({
      id: userId,
      username: 'Mike',
      password: 'Ultra secret',
      email: 'mike@example.com',
    })
  );
  console.timeEnd('In Memory Database');
})();
