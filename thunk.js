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

const getCharlie = thunk(functionAsyncCache(getUser))(1);
const getOtto = thunk(functionAsyncCache(getUser))(2);

const isCharlie = async (lazyUser) => {
  const user = await lazyUser();

  return user.username === 'charlie';
};

(async () => {
  console.time('getCharlie');
  console.log(await getCharlie());
  console.timeEnd('getCharlie');

  console.log();

  console.time('isCharlie');
  console.log(await isCharlie(getCharlie));
  console.timeEnd('isCharlie');

  console.log();

  console.time('isNotCharlie');
  console.log(await isCharlie(getOtto));
  console.timeEnd('isNotCharlie');
})();
