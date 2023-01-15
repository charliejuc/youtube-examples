const { OrderRepository } = require('../../database/OrderRepository');
const { ProductRepository } = require('../../database/ProductRepository');

const buyController = async (request, response) => {
  const body = request.body;

  const productId = body.productId;
  const userId = body.userId;

  if (productId == null) {
    return response.status(400).send({
      errors: {
        productId: 'productId is required',
      },
    });
  }

  if (userId == null) {
    return response.status(400).send({
      errors: {
        userId: 'userId is required',
      },
    });
  }

  const productRepository = new ProductRepository();
  const orderRepository = new OrderRepository();

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

  response.status(201).send(order);
};

module.exports = {
  buyController,
};
