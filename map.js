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
  ],
  posts: [
    {
      id: 1,
      userId: 2,
      title: 'My First Post V2',
    },
    {
      id: 2,
      userId: 1,
      title: 'My First Post V1',
    },
  ],
};

const getUserWithPosts = (userId) =>
  new Promise((resolve) =>
    setTimeout(
      (userId) => {
        const user = db.users.find((user) => user.id === userId);

        if (user === undefined) {
          resolve(null);
          return;
        }

        const posts = db.posts.filter((post) => post.userId === userId);

        resolve({
          ...user,
          posts: posts || [],
        });
      },
      200,
      userId
    )
  );

(async () => {
  console.time('Timer');

  const ids = [1, 2];

  const usersWithPosts = await Promise.all(ids.map(getUserWithPosts));

  console.log(usersWithPosts);

  console.timeEnd('Timer');
})();
