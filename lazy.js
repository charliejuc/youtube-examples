const db = {
  users: [
    {
      id: 1,
      username: 'charlie',
    },
    {
      id: 2,
      username: 'otto',
    },
    {
      id: 3,
      username: 'su',
    },
  ],
};

const getUser = (userId) =>
  new Promise((resolve) =>
    setTimeout(
      (userId) => {
        const user = db.users.find((user) => user.id === userId);

        resolve(user);
      },
      200,
      userId
    )
  );

const functionAsyncCache = (fn) => {
  const cache = {};

  return async (...args) => {
    const key = JSON.stringify(args);

    if (key in cache) {
      return cache[key];
    }

    cache[key] = await fn(...args);

    return cache[key];
  };
};
const thunk =
  (fn) =>
  (...args) =>
  () =>
    fn(...args);

class Lazy {
  constructor(fetch) {
    this._fetch = fetch;
  }

  async select(field) {
    const fields = Array.isArray(field) ? field : [field];
    const obj = await this._fetch();

    return fields.reduce((fieldsSelected, fieldSelected) => {
      return {
        ...fieldsSelected,
        [fieldSelected]: obj[fieldSelected],
      };
    }, {});
  }
}

(async () => {
  const userId = 1;
  const lazyUser = new Lazy(thunk(functionAsyncCache(getUser))(userId));

  console.time('lazyUser - no cached');
  console.log(await lazyUser.select(['id', 'username']));
  console.timeEnd('lazyUser - no cached');

  console.log();

  console.time('lazyUser - cached');
  console.log(await lazyUser.select(['id', 'username']));
  console.timeEnd('lazyUser - cached');

  console.log();

  console.time('lazyUser - cached only username');
  console.log(await lazyUser.select('username'));
  console.timeEnd('lazyUser - cached only username');

  console.log();
})();
