const buyProduct = (productRepository, orderRepository) => async (productId, userId) => {
  const productDocument = await productRepository.getById(productId);

  const discount = productDocument.discount || 0;
  const amount = productDocument.amount - (productDocument.amount * discount) / 100;

  const order = {
    id: Math.random().toString(32).slice(2),
    userId,
    products: [productDocument],
    amount,
  };

  await orderRepository.insert(order);

  return order;
};

module.exports = {
  buyProduct,
};
