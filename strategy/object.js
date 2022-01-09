const _getElementStrategy = {
  user: async (id) => ({
    id,
    username: 'mike',
  }),
  post: async (id) => ({
    id,
    title: 'Super Post',
    description: 'One description',
  }),
};

const getElementStrategy = (type) => {
  const getElement = _getElementStrategy[type];

  return (...args) => {
    return getElement(...args);
  };
};

(async () => {
  console.log(await getElementStrategy('user')(3));
  console.log(await getElementStrategy('post')(2));
})();
