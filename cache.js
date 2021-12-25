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

const getUserCached = functionAsyncCache(getUser);

(async () => {
  console.time('getUserCached - no cached');
  console.log(await getUserCached(1));
  console.timeEnd('getUserCached - no cached');

  console.log();

  console.time('getUserCached - cached');
  console.log(await getUserCached(1));
  console.timeEnd('getUserCached - cached');

  console.log();

  console.time('getUserCached - no cached');
  console.log(await getUserCached(2));
  console.timeEnd('getUserCached - no cached');

  console.log();

  console.time('getUserCached - cached');
  console.log(await getUserCached(2));
  console.timeEnd('getUserCached - cached');
})();
